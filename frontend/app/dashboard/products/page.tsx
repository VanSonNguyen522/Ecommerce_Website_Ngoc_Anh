import ProductForm from "./components/ProductForms";


const ProductsPage = () => {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Create a New Product</h1>
      <ProductForm />
    </div>
  );
};

export default ProductsPage;
