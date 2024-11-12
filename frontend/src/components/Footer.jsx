import React from 'react'
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className='w-full bg-gray-900 bg-opacity-90 backdrop-blur-md shadow-lg z-40 transition-all duration-300 border-b border-primary_dark_color'>
        <div className='container mx-auto px-4 py-3 flex flex-wrap justify-around p-10 gap-10'>
            <div className='flex flex-col flex-wrap justify-between items-start gap-5 p-5'>
              <h1 className='text-xl sm:text-2xl font-bold text-primary_text_color items-center space-x-2 flex gap-2'>
                <img src = "/ThreadWears.svg" alt="ThreadWears Logo" className='size-12' />
                Threadwears
              </h1>
              <h3 className='max-w-72 text-x1'>
                Your trustworthy E-commerce store for your clothings and accessories.<br />
                Look good, Feel good.
              </h3>
            </div>
            <div className='flex flex-col flex-wrap justify-around items-start gap-4 p-5'>
                <h3 className='text-xl sm:text-xl font-semibold text-primary_text_color items-center space-x-2 flex gap-2 pl-2'>
                  Contact Us
                </h3>
                <Link to='https://maps.app.goo.gl/7waw5tC9hhagKj6X8' className='flex items-center gap-2 hover:text-gray-400 transition ease-in-out duration-300'>
                <i className="fa fa-map-marker text-2xl" aria-hidden="true"></i>
                  Burj Al Arab, Dubai
                </Link>
                <Link to='tel:+2348142340393' className='flex items-center gap-2 hover:text-gray-400 transition ease-in-out duration-300'>
                <i className="fa fa-phone text-2xl" aria-hidden="true"></i>
                  +234-814-234-0393
                </Link>
                <Link to='mailto:stunner234diamond@gmail.com' className='flex items-center gap-2 hover:text-gray-400 transition ease-in-out duration-300'>
                <i className="fa fa-envelope text-2xl" aria-hidden="true"></i>
                  stunner234diamond@gmail.com
                </Link>
            </div>
            <div className='flex flex-col flex-wrap justify-around items-center p-10 gap-6'>
                <h3 className='text-xl sm:text-xl font-semibold text-primary_text_color items-center space-x-2 flex gap-2 pl-2'>
                  Other Socials
                </h3>
                <div className="flex flex-row flex-wrap items-center justify-center gap-x-14 gap-y-4">
                  <Link to='https://www.twitter.com' className=' flex items-center justify-center hover:text-gray-400 transition ease-in-out duration-300 w-8 h-8 rounded-2xl border'>
                    <i className="fa fa-twitter text-xl" aria-hidden="true"></i>
                  </Link>
                  <Link to='https://www.linkedin.com' className=' flex items-center justify-center hover:text-gray-400 transition ease-in-out duration-300 w-8 h-8 rounded-2xl border'>
                    <i className="fa fa-linkedin" aria-hidden="true"></i>
                  </Link>
                  <Link to='https://www.instagram.com' className=' flex items-center justify-center hover:text-gray-400 transition ease-in-out duration-300 w-8 h-8 rounded-2xl border'>
                    <i className="fa fa-instagram" aria-hidden="true"></i>
                  </Link>
                  <Link to='https://www.facebook.com' className=' flex items-center justify-center hover:text-gray-400 transition ease-in-out duration-300 w-8 h-8 rounded-2xl border'>
                    <i className="fa fa-facebook" aria-hidden="true"></i>
                  </Link>
                  <Link to='https://www.youtube.com' className=' flex items-center justify-center hover:text-gray-400 transition ease-in-out duration-300 w-8 h-8 rounded-2xl border'>
                    <i className="fa fa-youtube-play" aria-hidden="true"></i>
                  </Link>
                </div>
            </div>
        </div>
        <div className="container mx-auto px-4 py-3 flex justify-center items-center p-10 border-t h-32">©Copyright 2024. All rights reserved.</div>
    </footer>
  )
};

export default Footer;