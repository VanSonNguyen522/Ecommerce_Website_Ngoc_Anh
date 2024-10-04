import { FormEvent, useState } from 'react';
import { toast } from 'react-hot-toast';

const ProductCreateForm = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null); // For uploaded file
  const [category, setCategory] = useState('sắt hộp'); // Default category
  const [status, setStatus] = useState(''); // Initialize as empty for optional
  const [isNew, setIsNew] = useState(false); // State for isNew
  const [isOnSale, setIsOnSale] = useState(false); // State for isOnSale

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]; // Get the first selected file
    if (file) {
      setImageFile(file);
      setImage(''); // Clear the image URL if a file is selected
    }
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Allow only numeric input
    if (/^\d*\.?\d*$/.test(value)) {
      setPrice(value); // Set the price only if it's a valid number
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let finalImage = image;

    // Handle file upload if a file is selected
    if (imageFile) {
      const formData = new FormData();
      formData.append('file', imageFile);
      formData.append('productName', name); // Send product name for the filename

      const uploadRes = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (uploadRes.ok) {
        const { filePath } = await uploadRes.json();
        finalImage = filePath; // Get the file path returned from the upload API
      } else {
        toast.error("Failed to upload image.");
        return;
      }
    }

    const res = await fetch('/api/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, description, price, finalImage, category, status, isNew, isOnSale }),
    });

    if (res.ok) {
      console.log('Product created successfully');
      toast.success("Product posted successfully!");
      // Reset form after submission
      setName('');
      setDescription('');
      setPrice('');
      setImage('');
      setImageFile(null); // Clear the uploaded file
      setCategory('sắt hộp');
      setStatus(''); // Reset status to empty
      setIsNew(false);
      setIsOnSale(false);
    } else {
      console.log('Error creating product');
      toast.error("Failed to post product.");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen p-4">
      <form onSubmit={handleSubmit} className="w-full max-w-lg bg-white p-6 rounded-md shadow-md flex flex-col space-y-4">
        <div>
          <label className="block text-gray-700">Product Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            rows={3}
            required
          />
        </div>

        <div>
          <label className="block text-gray-700">Price</label>
          <input
            type="number"
            value={price}
            onChange={handlePriceChange} // Use the new handler
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700">Product Image URL</label>
          <input
            type="text"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Or upload an image file"
          />
        </div>

        <div>
          <label className="block text-gray-700">Upload Image</label>
          <input
            type="file"
            onChange={handleFileChange}
            className="w-full p-2 border border-gray-300 rounded"
            accept="image/*"
          />
        </div>

        <div>
          <label className="block text-gray-700">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            required
          >
            <option value="sắt hộp">Sắt Hộp</option>
            <option value="ván gỗ">Ván Gỗ</option>
            <option value="lưới b40">Lưới B40</option>
            <option value="tôn lạnh xốp">Tôn Lạnh Xốp</option>
            <option value="ván symbo">Ván Symbo</option>
          </select>
        </div>

        <div>
          <label className="block text-gray-700">Status (Optional)</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          >
            <option value="">Select Status</option>
            <option value="newest">Newest</option>
            <option value="trending">Trending</option>
            <option value="featured">Featured</option>
            <option value="best seller">Best Seller</option>
          </select>
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            checked={isNew}
            onChange={(e) => setIsNew(e.target.checked)}
            className="mr-2"
          />
          <label className="text-gray-700">Is New</label>
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            checked={isOnSale}
            onChange={(e) => setIsOnSale(e.target.checked)}
            className="mr-2"
          />
          <label className="text-gray-700">Is On Sale</label>
        </div>

        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500"
        >
          Create Product
        </button>
      </form>
    </div>
  );
};

export default ProductCreateForm;
