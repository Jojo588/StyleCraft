import { useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import { LogOut } from "lucide-react";
import { Button } from "../components/ui/Button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetDescription } from "../components/ui/Sheet";
import {
  FaBars,
  FaInfoCircle,
  FaComments ,
  FaImages ,
  FaRegComments ,
  FaPencilRuler,
} from "react-icons/fa";

const SubMenu = ({ handleLogOut, submenuOpen, setSubMenuOpen, isLoggedIn }) => {
  const subMenuNavOptions = [
    {
      to: "/fashion-customizer",
      label: "Start Customizing",
      icon: <FaPencilRuler />,
    },
    {
      to: "/about",
      label: "About",
      icon: <FaInfoCircle />,
    },
    {
      to: "/lets-talk-fashion",
      label: "lets talk fashion",
      icon: <FaComments  />,
    },
    {
      to: "/gallery",
      label: "Gallery",
      icon: <FaImages  />,
    },
    {
      to: "/recent-discussions",
      label: "Recent Discussions",
      icon: <FaRegComments   />,
    },
  ];

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 765) {
        setSubMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, [setSubMenuOpen]);

  return (
    <Sheet open={submenuOpen} onOpenChange={setSubMenuOpen}>
      <SheetTrigger asChild className="duration-300 p-1 md:hidden">
        <Button variant="ghost" size="icon">
          <FaBars className="h-5 w-5" />
        </Button>
      </SheetTrigger>

      <SheetContent
        side="right"
        className="bg-white p-6 text-gray-800 flex flex-col justify-between"
      >
        <SheetTitle className="visually-hidden">Main Menu</SheetTitle>
        <SheetDescription className="visually-hidden">
          Select a page to visit or manage your account.
        </SheetDescription>

        <nav className="space-y-5 mt-4 overflow-y-auto max-h-[calc(100vh-100px)] hide-scrollbar">
          {subMenuNavOptions.map(({ to, label, icon }) => (
            <NavLink
              key={to}
              to={to}
              onClick={() => setSubMenuOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 text-base px-2 py-2 rounded-md transition-colors duration-200 ${
                  isActive
                    ? "text-teal-600 font-semibold bg-teal-50"
                    : "text-gray-700 hover:text-teal-600 hover:bg-gray-100 font-medium"
                }`
              }
            >
              <span className="text-lg">{icon}</span>
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="flex justify-center mt-8">
          {isLoggedIn ? (
            <button
              onClick={handleLogOut}
              className="flex items-center gap-2 text-red-500 hover:text-red-700 font-medium transition-colors duration-200 text-base"
            >
              <LogOut className="w-5 h-5" />
              <span>Log Out</span>
            </button>
          ) : (
            <Link to="/sign-in">
              <button className="capitalize duration-300 transition-all hover:text-teal-400">
                sign in
              </button>
            </Link>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default SubMenu;
