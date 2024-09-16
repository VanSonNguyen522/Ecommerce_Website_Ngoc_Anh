import React from 'react'
import Navbar from '@/components/Navbar'
import Content from '@/app/Pages/HomePage/Components/Content'
import Hero from '@/app/Pages/HomePage/Components/Hero'
import HotFeatures from '@/app/Pages/HomePage/Components/HotFeatures'
import Product_Demo from '@/app/Pages/HomePage/Components/Product_Demo'
import Customer_Response from '@/app/Pages/HomePage/Components/Customer_Resposne'
import Footer from '@/components/Footer'
const HomePage = () => {
  return (
    <div>
      <Navbar />
      <Content />
      <Hero />
      <HotFeatures />
      <Product_Demo />
      <Customer_Response />
      <Footer />
    </div>
  )
}

export default HomePage
