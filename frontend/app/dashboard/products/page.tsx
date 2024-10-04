"use client"

import { Sidebar } from "../components/Sidebar";
import DashboardLayout from "../DashboardLayout";
import EditProductForm from "./components/EditProductForms";
import ProductCreateForm from "./components/ProductForms";
import ProductList from "./components/ProductsList";


const ProductsPage = () => {
  return (
    // <div className="flex flex-col mx-auto p-6">
    //   <h1 className="text-2xl font-bold mb-6">Create a New Product</h1>
    //   <ProductForm />
    // </div>
    <DashboardLayout>
        <h1 className="text-2xl font-bold mb-6">Products Dashboard Page</h1>
        <ProductCreateForm />
        <ProductList />
        <EditProductForm/>
    </DashboardLayout>
  );
};

export default ProductsPage;
