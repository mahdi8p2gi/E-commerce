import { Link, NavLink, Outlet } from "react-router-dom";
import { assets, sidebarLinks } from "../../assets/assets";
import { useState } from "react"; // Import useState

const SellerLayout = () => {
  const [productAdded, setProductAdded] = useState(0); // State to trigger refresh
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);


  const handleProductAdded = () => {
    setProductAdded((prev) => prev + 1);
  };

  return (
    <div className="flex h-screen bg-white">
      {/* Sidebar */}
      <aside
        className={`fixed z-20 inset-y-0 left-0 w-64 px-2 pt-6 border-r border-gray-300 bg-white transform transition-transform duration-200 ease-in-out
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
        md:static md:translate-x-0`}
      >
        {/* لوگو */}
        <div className="flex items-center justify-between mb-8 px-2">
          <Link to="/">
            <img src={assets.logo} alt="logo" className="w-36" />
          </Link>
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); setIsSidebarOpen(false); }}
            className="p-2 md:hidden"
            aria-label="Close sidebar"
          >
            ✕
          </button>
        </div>

        {/* لینک‌های سایدبار */}
        <nav className="flex flex-col gap-1">
          {sidebarLinks.map((item, index) => (
            <NavLink
              key={index}
              to={item.path}
              onClick={() => setIsSidebarOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-md transition-all ${isActive
                  ? "bg-primary/20 text-primary font-medium"
                  : "text-gray-700 hover:bg-primary/20"
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
      {/* Overlay for mobile when sidebar open */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-10 bg-black/30 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <main className="flex-1 overflow-auto" onClick={() => { if (isSidebarOpen) setIsSidebarOpen(false); }}>
        {/* Top bar (mobile) */}
        <div className="flex items-center justify-between px-4 py-3 border-b md:hidden">
          <button
            type="button"
            onClick={() => setIsSidebarOpen(true)}
            className="p-2"
            aria-label="Open sidebar"
          >
            ☰
          </button>
          <p className="text-base font-semibold">Admin</p>
          <span className="w-6" />
        </div>

        {/* Header (desktop) */}
        <div className="items-center justify-between hidden px-6 py-4 md:flex">
          <p className="text-lg font-semibold">Hi, Admin 👋</p>
          <button className="px-4 py-1 text-sm border border-gray-400 rounded-full hover:bg-gray-100">Logout</button>
        </div>

        {/* محتوای داخلی */}
        <div className="px-4 pb-6 md:px-6">
          <Outlet context={{ productAdded, handleProductAdded }} /> {/* Pass state and handler via context */}
        </div>
      </main>
    </div>
  );
};

export default SellerLayout;
