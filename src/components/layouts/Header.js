import { useState, useEffect, useRef } from "react";
import Logo from "../../assets/images/logo.png";
import useCategories from "../../hooks/useCategories";
import { Link, useNavigate } from "react-router-dom";
import Spinner from "../../ui/Spinner";

export default function Header() {
  const [sideBar, setSideBar] = useState(false);

  const sidebarRef = useRef(null);
  const searchInputRef = useRef(null);
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");

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
    }, 500); //match with sidebar animation duration
  };

  console.log(searchTerm);
  const { categories, error, isLoading } = useCategories();

  return (
    <div className="flex flex-wrap fixed z-10">
      <header className="relative mx-auto ">
        {/* <!-- navbar --> */}
        <nav className="flex top-0 left-0 right-0 justify-between bg-gray-900 text-white w-screen">
          <div className="pl-5 xl:px-12 lg:py-2 py-3 flex w-full items-center">
            <Link
              className="text-3xl font-bold font-heading"
              to="/"
              onClick={() => setSideBar(false)}
            >
              <img className="h-12" src={Logo} alt="logo" />
            </Link>
            {/* <!-- Nav Links --> */}
            <ul className="hidden md:flex px-4 mx-auto font-semibold font-heading space-x-12">
              <li>
                <Link className="hover:text-gray-200" to="/">
                  Home
                </Link>
              </li>
              <li className="relative group">
                <Link className="hover:text-gray-200" to="/products">
                  Category
                </Link>
                {/* <!-- Dropdown Menu --> */}
                <ul className="absolute left-0 mt-2 w-48 bg-gray-800 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {categories?.data?.map((category) => (
                    <li key={category.id}>
                      <Link
                        className="block px-4 py-2 hover:bg-gray-700"
                        to={`/products/${category.name}`} // Optional: Use dynamic link based on category
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
            <div className="hidden xl:flex items-center space-x-5">
              <a className="flex items-center hover:text-gray-200" href="">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
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
                <span className="flex absolute -mt-5 ml-4">
                  <span className="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-pink-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-pink-500"></span>
                </span>
              </a>
            </div>
          </div>
          {/* <!-- Responsive navbar --> */}
          <a
            className="xl:hidden flex mr-6 items-center"
            onClick={handleSearchIconClick}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 hover:text-gray-200"
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

          <a className="xl:hidden flex mr-6 items-center" href="#">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 hover:text-gray-200"
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
            <span className="flex absolute -mt-5 ml-4">
              <span className="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-pink-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-pink-500"></span>
            </span>
          </a>
          {/* <!--  Burger button --> */}
          <a
            className="navbar-burger self-center mr-6 md:hidden"
            onClick={() => setSideBar(!sideBar)}
          >
            {sideBar ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 hover:text-gray-200"
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
                className="h-6 w-6 hover:text-gray-200"
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
          <div className="navbar-menu z-50 h-full">
            <nav
              id="sidebar"
              className="flex w-full h-full lg:h-fit flex-col overflow-y-auto bg-gray-900 pt-8  transition-transform duration-500 ease-in-out"
            >
              {/* Sidebar Content */}

              <div className=" px-4 pb-6">
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
                      className="w-full px-4 py-1 rounded-xl border border-gray-300 bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500"
                    />
                  </form>
                </div>
                <h3 className="mb-2 text-xs font-medium uppercase text-gray-500">
                  <Link onClick={() => setSideBar(false)} to="products">
                    Produktet
                  </Link>
                </h3>
                <ul className="mb-8 text-sm font-medium">
                  {categories?.data?.map((category) => {
                    return (
                      <li key={category.id}>
                        <Link
                          className="active flex items-center rounded py-3 pl-3 pr-4 text-gray-50 hover:bg-gray-600 "
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
                <h3 className="mb-2 text-xs font-medium uppercase text-gray-500">
                  Kontakt
                </h3>
                <ul className="mb-8 text-sm font-medium">
                  <li>
                    <a
                      className="flex items-center rounded py-3 pl-3 pr-4 text-gray-50 hover:bg-gray-600"
                      href="https://www.instagram.com/diva_cos/"
                      target="_blank"
                    >
                      <span className="select-none">Instagram</span>
                    </a>
                  </li>
                  <li>
                    <Link
                      onClick={() => setSideBar(!sideBar)}
                      className="flex items-center rounded py-3 pl-3 pr-4 text-gray-50 hover:bg-gray-600"
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
