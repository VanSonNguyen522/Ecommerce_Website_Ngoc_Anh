import React from 'react'
import Navbar from '@/components/Navbar'
import Content from '@/app/pages/HomePage/Components/Content'
import Hero from '@/app/pages/HomePage/Components/Hero'
import HotFeatures from '@/app/pages/HomePage/Components/HotFeatures'
import Product_Demo from '@/app/pages/HomePage/Components/Product_Demo'
import Customer_Response from '@/app/pages/HomePage/Components/Customer_Resposne'
import Footer from '@/components/Footer'
import MyComponents from '@/components/test'
// import CreateAdminButton from '@/components/CreateAdminButton'
const HomePage = () => {
  return (
    <div>
      <MyComponents />
      <Navbar />
      <Content />
      <Hero />
      <HotFeatures />
      <Product_Demo />
      <Customer_Response />
      <Footer />
      {/* <CreateAdminButton /> */}
    </div>
  )
}

export default HomePage
