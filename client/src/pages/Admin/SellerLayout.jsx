import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import { assets } from "../../assets/assets";

const SellerLayout = () => {
  const navigate = useNavigate();

const sidebarLinks = [
  { name: "Add Product", path: "/seller-layout/add-product", icon: assets.add_icon },
  { name: "Product List", path: "/seller-layout/products-list", icon: assets.product_list_icon },
  { name: "Orders", path: "/seller-layout/orders", icon: assets.order_icon },
];


  const handleLogout = () => {
    // اگر logout واقعی داری، اینجا انجام بده
    navigate("/");
  };

  return (
    <div className="flex h-screen bg-white">
      {/* Sidebar */}
      <aside className="flex flex-col w-64 px-2 pt-6 border-r border-gray-300">
        {/* لوگو */}
        <Link to="/" className="mb-8 text-center">
          <img src={assets.logo} alt="logo" className="mx-auto w-36" />
        </Link>

        {/* لینک‌های سایدبار */}
        <nav className="flex flex-col gap-1">
          {sidebarLinks.map((item, index) => (
            <NavLink
              key={index}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-md transition-all ${
                  isActive
                    ? "bg-indigo-100 text-indigo-600 font-medium"
                    : "text-gray-700 hover:bg-gray-100"
                }`
              }
            >
              <img src={item.icon} alt={item.name} className="w-5 h-5" />
              <span>{item.name}</span>
            </NavLink>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-auto">
        {/* بالای صفحه */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-lg font-semibold">Hi, Admin 👋</p>
          <button
            onClick={handleLogout}
            className="px-4 py-1 text-sm border border-gray-400 rounded-full hover:bg-gray-100"
          >
            Logout
          </button>
        </div>

        {/* محتوای داخلی */}
        <Outlet />
      </main>
    </div>
  );
};

export default SellerLayout;
