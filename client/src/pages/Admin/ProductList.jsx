import { useEffect } from "react";
import axios from "axios";
import { useOutletContext } from "react-router-dom";
import toast from "react-hot-toast";
import { useAppContext } from "../../context/AppContext";

const ProductList = () => {
  const { productAdded } = useOutletContext();
  const { currency, fetchProducts, products } = useAppContext();

  useEffect(() => {
    fetchProducts();
  }, [productAdded]);

  const toggleStock = async (id, inStock) => {
    try {
      const { data } = await axios.post('http://localhost:5000/api/product/stock', { id, inStock })
      if (data.success) {
        fetchProducts()
        toast.success(data.message)
      }
    } catch (error) {
      toast.error(error.message)

    }
  }

  return (
    <div className="flex flex-col justify-between flex-1 py-10">
      <div className="w-full p-4 md:p-10">
        <h2 className="pb-4 text-lg font-medium">All Products</h2>
        <div className="flex flex-col items-center w-full max-w-4xl overflow-hidden bg-white border rounded-md border-gray-500/20">
          <table className="w-full overflow-hidden table-fixed md:table-auto">
            <thead className="text-sm text-left text-gray-900">
              <tr>
                <th className="px-4 py-3 font-semibold truncate">Product</th>
                <th className="px-4 py-3 font-semibold truncate">Category</th>
                <th className="hidden px-4 py-3 font-semibold truncate md:block">Selling Price</th>
                <th className="px-4 py-3 font-semibold truncate">In Stock</th>
              </tr>
            </thead>
            <tbody className="text-sm text-gray-500">
              {products.map((product, index) => (
                <tr key={index} className="border-t border-gray-500/20">
                  <td className="flex items-center py-3 pl-2 space-x-3 truncate md:px-4 md:pl-4">
                    <div className="overflow-hidden border border-gray-300 rounded">
                      {/* مطمئن شو product.image یک رشته یا URL است */}
                      <img src={product.image[0] || ""} alt="Product" className="w-16" />
                    </div>
                    <span className="w-full truncate max-sm:hidden">{product.name}</span>
                  </td>
                  <td className="px-4 py-3">{product.category}</td>
                  <td className="px-4 py-3 max-sm:hidden">{currency} {product.offerPrice}</td>
                  <td className="px-4 py-3">
                    <label className="relative inline-flex items-center gap-3 text-gray-900 cursor-pointer">
                      <input onClick={()=> toggleStock(product._id , !product.inStock)}
                      checked={product.inStock} type="checkbox" className="sr-only peer" />
                      <div className="w-12 transition-colors duration-200 rounded-full h-7 bg-slate-300 peer peer-checked:bg-blue-600"></div>
                      <span className="absolute w-5 h-5 transition-transform duration-200 ease-in-out bg-white rounded-full dot left-1 top-1 peer-checked:translate-x-5"></span>
                    </label>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
