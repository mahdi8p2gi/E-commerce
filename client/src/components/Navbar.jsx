import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { assets } from "../assets/assets";
import { useAppContext } from "../context/AppContext";
import { FaRegHeart } from "react-icons/fa";
import * as Tooltip from "@radix-ui/react-tooltip";

function Navbar() {
  const [open, setOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  
  const {
    user,
    setUser,
    setShowUserLogin,
    navigate,
    setSearchQuery,
    searchQuery,
    getCartCount,
  } = useAppContext();

  const logout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      setUser(null);
      setProfileOpen(false);
      navigate("/");
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  useEffect(() => {
    if (searchQuery.length > 0) {
      navigate("/products");
    }
  }, [searchQuery, navigate]);



  const handleWishList = async () => {
    navigate('/wishlist')
  }


  return (
    <nav className="relative flex items-center justify-between px-6 py-4 transition-all bg-white border-b border-gray-300 md:px-16 lg:px-24 xl:px-32">
      {/* لوگو */}
      <NavLink to="/" onClick={() => setOpen(false)}>
        <img src={assets.logo} alt="logo" className="h-10" />
      </NavLink>

      {/* دکمه داشبورد ادمین */}
      {user?.role === "admin" && (
        <NavLink
          to="/seller-layout"
          className="px-4 py-1 text-white bg-primary border rounded-full hover:bg-indigo-600"
        >
          Admin Dashboard
        </NavLink>
      )}
      <p className="text-black">Current Role: {user?.role || "No user"}</p>


      {/* منوی دسکتاپ */}
      <div className="items-center hidden gap-8 text-gray-900 sm:flex">
        <NavLink to="/" className="transition duration-300 hover:text-primary">
          Home
        </NavLink>
        <NavLink to="/products" className="transition duration-300 hover:text-primary">
          Products
        </NavLink>
        <NavLink to="/contact" className="transition duration-300 hover:text-primary">
          Contact
        </NavLink>

        {/* جستجو */}
        <div className="items-center hidden gap-2 px-3 text-sm bg-white border border-gray-300 rounded-full lg:flex">
          <input
            onChange={(e) => setSearchQuery(e.target.value)}
            className="py-1.5 w-full bg-transparent outline-none placeholder-gray-500"
            type="text"
            placeholder="Search products"
            value={searchQuery}
          />
          <img src={assets.search_icon} alt="search" className="w-4 h-4" />
        </div>

        {/* آیکون سبد خرید */}

        <Tooltip.Provider delayDuration={100}>
          <Tooltip.Root>
            <Tooltip.Trigger asChild>
              <div
                onClick={() => navigate("/cart")}
                className="relative cursor-pointer"
              >
                <img
                  src={assets.nav_cart_icon}
                  alt="cart"
                  className="w-6 transition opacity-80 hover:scale-110"
                />
                {getCartCount() > 0 && (
                  <span className="absolute -top-2 -right-3 text-xs text-white bg-primary w-[18px] h-[18px] rounded-full flex items-center justify-center">
                    {getCartCount()}
                  </span>
                )}
              </div>
            </Tooltip.Trigger>
            <Tooltip.Portal>
              <Tooltip.Content
                side="bottom"
                sideOffset={6}
                className="z-50 px-3 py-1 text-xs text-white rounded shadow-lg bg-primary animate-fade-in"
              >
                cart item
              </Tooltip.Content>
            </Tooltip.Portal>
          </Tooltip.Root>
        </Tooltip.Provider>

        {/* علاقه مندی ها */}
        <Tooltip.Provider delayDuration={100}>
          <Tooltip.Root>
            <Tooltip.Trigger asChild>
              <div onClick={handleWishList}>
                <FaRegHeart className="text-xl text-gray-500 transition cursor-pointer hover:scale-110 hover:text-red-500" />
              </div>
            </Tooltip.Trigger>
            <Tooltip.Portal>
              <Tooltip.Content
                className="z-50 px-3 py-1 text-xs text-white rounded shadow-md bg-primary animate-fade-in"
                side="bottom"
                sideOffset={5}

              >
                wishlist
              </Tooltip.Content>
            </Tooltip.Portal>
          </Tooltip.Root>
        </Tooltip.Provider>

        {/* بخش کاربر */}
        {!user ? (
          <button
            onClick={() => setShowUserLogin(true)}
            className="px-8 py-2 text-white transition rounded-full cursor-pointer bg-primary hover:bg-primary-dull"
          >
            Login | Sign up
          </button>
        ) : (
          <div className="relative">
            <div
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => setProfileOpen(!profileOpen)}
              title="Profile menu"
            >
              <img
                src={user?.profileImage || assets.profile_icon} // اگر نال بود عکس پیش‌فرض باشه
                alt="Profile"
                className="object-cover w-10 h-10 rounded-full"
                onError={(e) => {
                  e.currentTarget.src = assets.profile_icon; // اگر تصویر خراب بود عکس پیش‌فرض بذار
                }}
              />
            </div>

            {profileOpen && (
              <ul
                className="absolute right-0 mt-2 bg-white rounded-md shadow-lg min-w-[180px] z-50"
                onMouseLeave={() => setProfileOpen(false)}
              >
                <NavLink to="/profile" onClick={() => setProfileOpen(false)}>
                  <li className="px-4 py-2 cursor-pointer hover:bg-gray-100">
                    My Profile
                  </li>
                </NavLink>
                <NavLink to="/my-orders" onClick={() => setProfileOpen(false)}>
                  <li className="px-4 py-2 cursor-pointer hover:bg-gray-100">
                    My Orders
                  </li>
                </NavLink>
                <li
                  className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                  onClick={logout}
                >
                  Logout
                </li>
              </ul>
            )}
          </div>
        )}
      </div>

      {/* دکمه موبایل منو یا عکس پروفایل در موبایل */}
      <button
        onClick={() => setOpen(!open)}
        aria-label="Menu"
        className="sm:hidden"
      >
        <img
          src={user?.profileImage ? user.profileImage : assets.menu_icon}
          alt="menu"
          className="object-cover w-10 h-10 rounded-full"
          onError={(e) => {
            e.currentTarget.src = assets.menu_icon;
          }}
        />
      </button>

      {/* منوی موبایل */}
      {open && (
        <div className="absolute left-0 z-50 flex flex-col items-start w-full gap-4 px-6 py-4 text-sm bg-white shadow-md top-full sm:hidden">
          <NavLink
            to="/"
            onClick={() => setOpen(false)}
            className="w-full py-1 hover:text-primary"
          >
            Home
          </NavLink>

          <NavLink
            to="/products"
            onClick={() => setOpen(false)}
            className="w-full py-1 hover:text-primary"
          >
            Products
          </NavLink>

          {user && (
            <NavLink
              to="/my-orders"
              onClick={() => setOpen(false)}
              className="w-full py-1 hover:text-primary"
            >
              My Orders
            </NavLink>
          )}

          <NavLink
            to="/contact"
            onClick={() => setOpen(false)}
            className="w-full py-1 hover:text-primary"
          >
            Contact
          </NavLink>

          <div className="w-full mt-2">
            {!user ? (
              <button
                onClick={() => {
                  setOpen(false);
                  setShowUserLogin(true);
                }}
                className="w-full px-6 py-2 text-sm text-white transition rounded-full cursor-pointer bg-primary hover:bg-primary-dull"
              >
                Login | Sign up
              </button>
            ) : (
              <button
                onClick={() => {
                  setOpen(false);
                  logout();
                }}
                className="w-full px-6 py-2 text-sm text-white transition rounded-full cursor-pointer bg-primary hover:bg-primary-dull"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
