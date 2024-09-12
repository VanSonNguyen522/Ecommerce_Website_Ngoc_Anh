import React from 'react'
import Navbar from '@/components/Navbar'
import Content from '@/components/Content'
import Hero from '@/components/Hero'
import HotFeatures from '@/components/HotFeatures'
import Product_Demo from '@/components/Product_Demo'
const HomePage = () => {
  return (
    <div>
      <Navbar />
      <Content />
      <Hero />
      <HotFeatures />
      <Product_Demo />
    </div>
  )
}

export default HomePage
