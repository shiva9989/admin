// src/App.jsx
import { useState, useEffect } from 'react';
import supabase from './supabaseClient';
import ProductForm from './components/ProductForm';
import ProductTable from './components/ProductTable';
import Sidebar from './components/Sidebar';
import Header from './components/Header';

// Initialize Supabase client

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);

  // Fetch products from Supabase
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('Products')
        .select('*')
        .order('id', { ascending: true });

      if (error) throw error;
      setProducts(data || []);
    } catch (error) {
      console.error('Error fetching products:', error);
      setError('Failed to fetch products');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();

    // Set up real-time subscription for changes to the products table
    const subscription = supabase
      .channel('products-changes')
      .on('postgres_changes', 
          { event: '*', schema: 'public', table: 'products' }, 
          payload => {
            fetchProducts();
          })
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const handleAddProduct = async (productData, imageFile) => {
    try {
      // 1. Add the product to the database
      const { data, error } = await supabase
        .from('Products')
        .insert([productData])
        .select();
  
      if (error) throw error;
  
      // 2. Upload the image to storage with better error handling
      if (imageFile) {
        // Add file extension to ensure proper file type recognition
        const fileName = productData.name;
        const fileExt = imageFile.name.split('.').pop();
        const filePath = `${fileName}.${fileExt}`;
        
        console.log('Attempting to upload file:', filePath);
        
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('images')
          .upload(fileName, imageFile, {
            cacheControl: '3600',
            upsert: true
          });
        
        if (uploadError) {
          console.error('Upload error details:', uploadError);
          alert(`Image upload failed: ${uploadError.message}`);
          // Continue despite the image upload failure
        } else {
          console.log('File uploaded successfully:', uploadData);
        }
      }
  
      setShowForm(false);
      fetchProducts();
    } catch (error) {
      console.error('Error adding product:', error);
      setError(`Failed to add product: ${error.message}`);
    }
  };

  const handleDeleteProduct = async (id, name) => {
    try {
      // 1. Delete the product from the database
      const { error } = await supabase
        .from('Products')
        .delete()
        .eq('id', id);

      if (error) throw error;

      // 2. Delete the image from storage
      const { error: deleteError } = await supabase.storage
        .from('images')
        .remove([name]);

      if (deleteError) console.error('Error deleting image:', deleteError);

      fetchProducts();
    } catch (error) {
      console.error('Error deleting product:', error);
      setError('Failed to delete product');
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header setShowForm={setShowForm} />

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-6">
          <h1 className="text-3xl font-semibold text-gray-800 mb-6">Inventory Management</h1>

          {/* Error Message */}
          {error && (
            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6" role="alert">
              <p>{error}</p>
              <button 
                className="ml-2 text-red-700" 
                onClick={() => setError(null)}
              >
                Dismiss
              </button>
            </div>
          )}

          {/* Add Product Form */}
          {showForm && (
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-xl font-semibold mb-4">Add New Product</h2>
              <ProductForm 
                onSubmit={handleAddProduct} 
                onCancel={() => setShowForm(false)} 
              />
            </div>
          )}

          {/* Products Table */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            {loading ? (
              <div className="flex justify-center items-center p-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
              </div>
            ) : (
              <ProductTable 
                products={products} 
                onDelete={handleDeleteProduct} 
              />
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;