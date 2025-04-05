import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  Sun,
  Moon,
  ChevronDown,
  Home,
  User,
  MessageCircle,
} from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";
import { useAuth } from "../contexts/AuthContext";

const navItems = [
  { label: "Home", href: "/", icon: Home },
  {
    label: "Learn",
    items: [
      { label: "Courses", href: "/courses" },
      { label: "Tutorials", href: "/tutorials" },
      { label: "Resources", href: "/resources" },
    ],
  },
  {
    label: "Community",
    items: [
      { label: "Study Groups", href: "/study-groups" },
      { label: "Community Hub", href: "/community" },
      { label: "Video Chat", href: "/video-chat" },
    ],
  },
  { label: "Connect", href: "/connect" },
];

function QuickChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle chat message
    setMessage("");
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 relative"
      >
        <MessageCircle className="w-5 h-5" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-lg shadow-xl z-50"
          >
            <div className="p-4 border-b dark:border-gray-700">
              <h3 className="font-semibold">Quick Help</h3>
            </div>
            <div className="p-4 h-64 overflow-y-auto">
              {/* Chat messages would go here */}
              <div className="text-center text-gray-500 dark:text-gray-400">
                How can I help you today?
              </div>
            </div>
            <div className="p-4 border-t dark:border-gray-700">
              <form onSubmit={handleSubmit} className="flex gap-2">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 px-3 py-2 rounded-lg border dark:border-gray-700 bg-gray-50 dark:bg-gray-900"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600"
                >
                  Send
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const { user, signOut } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setActiveDropdown(null);
    setShowProfileMenu(false);
  }, [location]);

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  const navbarClasses = `
    fixed top-0 left-0 right-0 z-50 transition-all duration-300
    ${
      isScrolled
        ? "backdrop-blur-lg bg-white/15 dark:bg-gray-900/15 shadow-lg"
        : ""
    }
  `;

  return (
    <nav className={navbarClasses}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link
            to="/"
            className="text-2xl font-display font-bold text-primary-600 dark:text-primary-400"
          >
            ByteMe
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) =>
              "items" in item ? (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => setActiveDropdown(item.label)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <button className="flex items-center space-x-1 hover:text-primary-500">
                    <span>{item.label}</span>
                    <ChevronDown size={16} />
                  </button>
                  <AnimatePresence>
                    {activeDropdown === item.label && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute top-full left-0 w-48 py-2 mt-2 bg-white dark:bg-gray-800 rounded-lg shadow-xl"
                      >
                        {item.items?.map((subItem) => (
                          <Link
                            key={subItem.href}
                            to={subItem.href}
                            className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                          >
                            {subItem.label}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <Link
                  key={item.href}
                  to={item.href}
                  className="hover:text-primary-500 transition-colors"
                >
                  {item.label}
                </Link>
              )
            )}
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <QuickChatBot />
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
              aria-label={
                theme === "dark"
                  ? "Switch to light mode"
                  : "Switch to dark mode"
              }
            >
              {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setShowProfileMenu(!showProfileMenu)}
                  className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  <User className="w-5 h-5" />
                  <span>{user.fullName || "Profile"}</span>
                </button>
                <AnimatePresence>
                  {showProfileMenu && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute right-0 mt-2 w-48 py-2 bg-white dark:bg-gray-800 rounded-lg shadow-xl"
                    >
                      <Link
                        to="/profile"
                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        My Profile
                      </Link>
                      <button
                        onClick={handleSignOut}
                        className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-red-500"
                      >
                        Sign Out
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link
                to="/auth"
                className="bg-primary-500 text-white px-4 py-2 rounded-lg hover:bg-primary-600"
              >
                Sign In
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white dark:bg-gray-800"
          >
            <div className="container mx-auto px-4 py-4 space-y-4">
              {navItems.map((item) =>
                "items" in item ? (
                  <div key={item.label} className="space-y-2">
                    <div className="font-semibold">{item.label}</div>
                    <div className="pl-4 space-y-2">
                      z
                      {item.items?.map((subItem) => (
                        <Link
                          key={subItem.href}
                          to={subItem.href}
                          className="block hover:text-primary-500"
                        >
                          {subItem.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : (
                  <Link
                    key={item.href}
                    to={item.href}
                    className="block hover:text-primary-500"
                  >
                    {item.label}
                  </Link>
                )
              )}
              {user && (
                <Link to="/profile" className="block hover:text-primary-500">
                  My Profile
                </Link>
              )}
              <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                <button
                  onClick={toggleTheme}
                  className="flex items-center space-x-2 hover:text-primary-500"
                >
                  {theme === "dark" ? (
                    <>
                      <Sun size={20} />
                      <span>Light Mode</span>
                    </>
                  ) : (
                    <>
                      <Moon size={20} />
                      <span>Dark Mode</span>
                    </>
                  )}
                </button>
                {user ? (
                  <button
                    onClick={handleSignOut}
                    className="mt-4 w-full text-left text-red-500"
                  >
                    Sign Out
                  </button>
                ) : (
                  <Link
                    to="/auth"
                    className="mt-4 block bg-primary-500 text-white px-4 py-2 rounded-lg text-center"
                  >
                    Sign In
                  </Link>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

export default Navbar;
