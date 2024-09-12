import React from 'react'
import Navbar from '@/components/Navbar'
import Content from '@/components/Content'
import Hero from '@/components/Hero'
import HotFeatures from '@/components/HotFeatures'
import Product_Demo from '@/components/Product_Demo'
import Customer_Response from '@/components/Customer_Resposne'
const HomePage = () => {
  return (
    <div>
      <Navbar />
      <Content />
      <Hero />
      <HotFeatures />
      <Product_Demo />
      <Customer_Response />
    </div>
  )
}

export default HomePage
