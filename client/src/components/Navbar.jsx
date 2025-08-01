import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { assets } from "../assets/assets";
import { useAppContext } from "../context/AppContext";

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
    setUser(null);
    navigate("/");
    setProfileOpen(false);
  };

  useEffect(() => {
    if (searchQuery.length > 0) {
      navigate("/products");
    }
  }, [searchQuery]);

  return (
    <nav className="relative flex items-center justify-between px-6 py-4 transition-all bg-white border-b border-gray-300 md:px-16 lg:px-24 xl:px-32">
      <NavLink to="/" onClick={() => setOpen(false)}>
        <img src={assets.logo} alt="logo" className="h-10" />
      </NavLink>

      {/* Desktop Menu */}
      <div className="items-center hidden gap-8 text-gray-900 sm:flex">
        <NavLink to="/" className="hover:text-primary">Home</NavLink>
        <NavLink to="/products" className="hover:text-primary">Products</NavLink>
        <NavLink to="/contact" className="hover:text-primary">Contact</NavLink>

        <div className="items-center hidden gap-2 px-3 text-sm bg-white border border-gray-300 rounded-full lg:flex">
          <input
            onChange={(e) => setSearchQuery(e.target.value)}
            className="py-1.5 w-full bg-transparent outline-none placeholder-gray-500"
            type="text"
            placeholder="Search products"
          />
          <img src={assets.search_icon} alt="search" className="w-4 h-4" />
        </div>

        {/* آیکون سبد خرید */}
        <div className="flex items-center gap-4">
          <div
            onClick={() => navigate("/cart")}
            className="relative cursor-pointer"
          >
            <img
              src={assets.nav_cart_icon}
              alt="cart"
              className="w-6 opacity-80"
            />
            <span className="absolute -top-2 -right-3 text-xs text-white bg-primary w-[18px] h-[18px] rounded-full flex items-center justify-center">
              {getCartCount()}
            </span>
          </div>
        </div>

        {!user ? (
          <button
            onClick={() => setShowUserLogin(true)}
            className="px-8 py-2 text-white transition rounded-full cursor-pointer bg-primary hover:bg-primary-dull"
          >
            Login
          </button>
        ) : (
          <div className="relative">
            <div
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => setProfileOpen(!profileOpen)}
            >
              <img
                src={assets.profile_icon}
                className="w-10 h-10 rounded-full"
                alt="Profile"
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
                <NavLink to="/orders" onClick={() => setProfileOpen(false)}>
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

      {/* Mobile Menu Button */}
      <button
        onClick={() => setOpen(!open)}
        aria-label="Menu"
        className="sm:hidden"
      >
        <img
          src={open ? assets.close_icon : assets.menu_icon}
          alt="menu"
          className="w-6"
        />
      </button>

      {/* Mobile Menu */}
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
              to="/orders"
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
                Login
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
