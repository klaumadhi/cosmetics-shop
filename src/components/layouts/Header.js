import { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../assets/images/logo.png";
import useCategories from "../../hooks/useCategories";
import Spinner from "../../ui/Spinner";

export default function Header() {
  const [sideBar, setSideBar] = useState(false);
  const sidebarRef = useRef(null);
  const searchInputRef = useRef(null);
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");

  // Get cart items from Redux store
  const cartItems = useSelector((state) =>
    state.cart.items.reduce((total, item) => total + item.quantity, 0)
  );

  const handleSearchChange = (e) => {
    e.preventDefault();
    setSearchTerm(e.target.value);
  };

  const handleSearchIconClick = () => {
    if (!sideBar) {
      setSideBar(true); // Open the sidebar
    }
    setTimeout(() => {
      searchInputRef.current.focus(); // Focus the search input
    }, 500); // Match with sidebar animation duration
  };

  // Handle click on the cart icon
  const handleCartIconClick = () => {
    navigate("/cart"); // Navigate to the cart page
  };

  console.log(searchTerm);
  const { categories, error, isLoading } = useCategories();

  return (
    <div className="fixed z-10 flex flex-wrap">
      <header className="relative mx-auto">
        <nav className="top-0 left-0 right-0 flex justify-between w-screen text-white bg-gray-900">
          <div className="flex items-center w-full py-3 pl-5 xl:px-12 lg:py-2">
            <Link
              className="text-3xl font-bold font-heading"
              to="/"
              onClick={() => setSideBar(false)}
            >
              <img className="h-12" src={Logo} alt="logo" />
            </Link>
            <ul className="hidden px-4 mx-auto space-x-12 font-semibold md:flex font-heading">
              <li>
                <Link className="hover:text-gray-200" to="/">
                  Home
                </Link>
              </li>
              <li className="relative group">
                <Link className="hover:text-gray-200" to="/products">
                  Category
                </Link>
                <ul className="absolute left-0 w-48 mt-2 text-white transition-opacity duration-300 bg-gray-800 opacity-0 group-hover:opacity-100">
                  {categories?.data?.map((category) => (
                    <li key={category.id}>
                      <Link
                        className="block px-4 py-2 hover:bg-gray-700"
                        to={`/products/${category.name}`}
                      >
                        {category.description}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
              <li>
                <a className="hover:text-gray-200" href="#">
                  Collections
                </a>
              </li>
              <li>
                <a className="hover:text-gray-200" href="#">
                  Contact Us
                </a>
              </li>
            </ul>
            {/* <!-- Header Icons --> */}
            <div className="items-center hidden space-x-5 xl:flex">
              <a
                className="relative flex items-center hover:text-gray-200"
                onClick={handleCartIconClick}
                href="#"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>

                {/* Cart Items Badge */}
                {cartItems > 0 && (
                  <span className="absolute flex items-center justify-center w-4 h-4 text-xs text-white bg-pink-500 rounded-full -top-2 -right-2">
                    {cartItems}
                  </span>
                )}
              </a>
            </div>
          </div>
          <a
            className="flex items-center mr-6 xl:hidden"
            onClick={handleSearchIconClick}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6 hover:text-gray-200"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </a>
          <Link className="flex items-center mr-6 xl:hidden" to="cart">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6 hover:text-gray-200"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>

            {cartItems === 0 && (
              <span className="absolute flex ml-4 -mt-5">
                {/* Blinking effect */}
                <span className="relative flex w-3 h-3">
                  <span className="absolute inline-flex w-full h-full bg-pink-400 rounded-full opacity-75 animate-ping"></span>
                  <span className="relative inline-flex w-3 h-3 bg-pink-500 rounded-full"></span>
                </span>
              </span>
            )}
            {cartItems > 0 && (
              <span className="absolute flex ml-4 -mt-5">
                <span className="relative flex items-center justify-center w-4 h-4 my-auto text-xs text-white bg-pink-500 rounded-full">
                  {cartItems}
                </span>
              </span>
            )}
          </Link>
          <a
            className="self-center mr-6 navbar-burger md:hidden"
            onClick={() => setSideBar(!sideBar)}
          >
            {sideBar ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 hover:text-gray-200"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 hover:text-gray-200"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </a>
        </nav>

        {/* <!-- Sidebar start--> */}
        <div
          id="containerSidebar"
          ref={sidebarRef}
          className={`fixed z-50 transition-transform duration-500 ease-in-out h-full  md:hidden
    ${!sideBar ? "-translate-x-full" : "translate-x-0"}`}
          style={{
            width: sideBar ? "70%" : "0",
            pointerEvents: sideBar ? "auto" : "none",
          }}
        >
          <div className="z-50 h-full navbar-menu">
            <nav
              id="sidebar"
              className="flex flex-col w-full h-full pt-8 overflow-y-auto transition-transform duration-500 ease-in-out bg-gray-900 lg:h-fit"
            >
              {/* Sidebar Content */}

              <div className="px-4 pb-6 ">
                {/* <!-- Search Field --> */}
                <div className="mb-6">
                  <form onSubmit={() => navigate(`search/${searchTerm}`)}>
                    <input
                      type="text"
                      ref={searchInputRef}
                      placeholder="Search..."
                      value={searchTerm}
                      onBlur={() => setSearchTerm("")} // Clear the search term on blurq23
                      onChange={handleSearchChange}
                      className="w-full px-4 py-1 text-gray-900 placeholder-gray-500 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-500"
                    />
                  </form>
                </div>
                <h3 className="mb-2 text-xs font-medium text-gray-500 uppercase">
                  <Link onClick={() => setSideBar(false)} to="products">
                    Produktet
                  </Link>
                </h3>
                <ul className="mb-8 text-sm font-medium">
                  {categories?.data?.map((category) => {
                    return (
                      <li key={category.id}>
                        <Link
                          className="flex items-center py-3 pl-3 pr-4 rounded active text-gray-50 hover:bg-gray-600 "
                          to={`products/${category.name}`}
                          onClick={() => setSideBar(false)}
                        >
                          <span className="select-none">
                            {category.description}
                          </span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
              <div className="px-4 pb-6">
                <h3 className="mb-2 text-xs font-medium text-gray-500 uppercase">
                  Kontakt
                </h3>
                <ul className="mb-8 text-sm font-medium">
                  <li>
                    <a
                      className="flex items-center py-3 pl-3 pr-4 rounded text-gray-50 hover:bg-gray-600"
                      href="https://www.instagram.com/diva_cos/"
                      target="_blank"
                    >
                      <span className="select-none">Instagram</span>
                    </a>
                  </li>
                  <li>
                    <Link
                      onClick={() => setSideBar(!sideBar)}
                      className="flex items-center py-3 pl-3 pr-4 rounded text-gray-50 hover:bg-gray-600"
                      to="/admin"
                    >
                      <span className="select-none">Upload Products</span>
                    </Link>
                  </li>
                </ul>
              </div>
            </nav>
          </div>
        </div>
        {/* <!-- Sidebar end --> */}
      </header>
    </div>
  );
}
