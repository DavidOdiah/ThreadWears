import cloudinary from "../lib/cloudinary.js";
import { redis } from "../lib/redis.js";
import Product from "../models/product.model.js"
import User from "../models/user.model.js"


export const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find({}); // Finds all products
        res.json({ products });
    } catch (error) {
        console.log("Error in getAllProducts controller", error.message);
        res.status(500).json({ message: "Server error", error: error.message })
    }
}

export const getFeaturedProducts = async (req, res) => {
    try {
        let featuredProducts = await redis.get("featured_products");
        if (featuredProducts) {
            return res.json(JSON.parse(featuredProducts));
        }

        // If not in redis, fetch from mongoDB
        // .lean() is gonna return a plain javascript object instead of a mongodb document
        // which is good for performance
        featuredProducts = await Product.find({isFeatured:true}).lean();

        if (!featuredProducts) {
            res.status(404).json({ message: "No featured products found" });
        }

        // store in redis for future quick use

        await redis.set("featured_products", JSON.stringify(featuredProducts));

        res.json(featuredProducts);
    } catch (error) {
        console.log("Error in getFeaturedProducts controller", message.error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
}

export const createProduct = async (req, res) => {
    try {
        const {name, description, price, image, category} = req.body;

        let cloudinaryResponse = null;

        if (image) {
            cloudinaryResponse = await cloudinary.uploader.upload(image, {folder:"products"});
        }

        const product = await Product.create({
            name,
            description,
            price,
            image: cloudinaryResponse?.secure_url ? cloudinaryResponse.secure_url : "",
            category
        })

        res.status(201).json(product);
    } catch (error) {
        console.log("Error in createProduct controller", error.message);
        res.status(500).json({ message: "Server error", error: error.message });
    }
}

export const deleteProduct = async (req, res) => {
	try {
        console.log(req.params.id);
		const product = await Product.findById(req.params.id);
        console.log(product);

		if (!product) {
			return res.status(404).json({ message: "Product not found" });
		}

		await Product.findByIdAndDelete(req.params.id);


        // Delete from users if in there cart
        const users = await User.find({});
        users.forEach(async function(user) {
            // console.log(user);
            user.cartItems = user.cartItems.filter((item) => item.id !== req.params.id);
            await user.save();

        });
        
        // Update featured products cache incase its there
        await updateFeaturedProductCache();

        if (product.image) {
			const publicId = product.image.split("/").pop().split(".")[0];
			try {
				await cloudinary.uploader.destroy(`products/${publicId}`);
				console.log("deleted image from cloduinary");
			} catch (error) {
				console.log("error deleting image from cloduinary", error);
			}
		}

		res.json({ message: "Product deleted successfully" });
	} catch (error) {
		console.log("Error in deleteProduct controller", error.message);
		res.status(500).json({ message: "Server error", error: error.message });
	}
}

export const getRecommendedProducts = async (req, res) => {
    try {
        const products = await Product.aggregate([
            {
                $sample: {size:3}
            },
            {
                $project: {
                    _id: 1,
                    name: 1,
                    description: 1,
                    image: 1,
                    price: 1,
                }
            }
        ])

        res.json(products)
    } catch (error) {
        console.log("Error in getRecommendedProducts controller", error.message);
        res.status(500).json({ message: "Server error", error: error.message });
    }
}

export const getProductsByCategory = async (req, res) => {
    const {category} = req.params;
    try {
        const products = await Product.find({ category });
        res.json({ products });
    } catch (error) {
        console.log("Error in getProductsByCategory controller", error.message);
        res.status(500).json({ message: "Server error", error: error.message });
    }
}

export const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        res.json({product});
    } catch (error) {
        console.log("Error in getProductById controller", error.message);
        res.json({product: []});
        // res.status(500).json({ message: "Server error", error: error.message });
    }
}

export const toggleFeaturedProducts = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (product) {
            product.isFeatured = !product.isFeatured
            const updatedProduct = await product.save();
            
            // update cache
            await updateFeaturedProductCache();
            res.json(updatedProduct)
        } else {
            res.status(404).json("Product not found");
        }
    } catch (error) {
        console.log("Error in toggleFeaturedProducts controller", error.message);
        res.status(500).json({ message: "Server error", error: error.message });
    }
}

async function updateFeaturedProductCache () {
    try {

        // .lean() is gonna return a plain javascript object instead of a mongodb documents, this can significantly improve performance
        // but you dont want to use this everywhere and it does not work for all use cases
        const featuredProducts = await Product.find({ isFeatured: true }).lean();
        await redis.set("featured_products", JSON.stringify(featuredProducts));
    } catch (error) {
        console.log("Error in update cache function");
    }
}