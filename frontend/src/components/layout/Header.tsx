import { useTranslation } from "react-i18next";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Menu,
  X,
  Building2,
  MapPin,
  Calculator,
  Briefcase,
  Mail,
  Search,
  LogOut,
} from "lucide-react";
import { useAuth } from "@/lib/auth";
import { cn } from "@/lib/utils";
const navigation = [
  {
    name: "Search",
    icon: Search,
    items: [
      {
        title: "Business Transfer & Commercial Lease",
        items: [
          "Business Transfer and Commercial Lease",
          "Commercial Space Rental without Transfer",
        ],
      },
      {
        title: "Retail Walls",
        items: ["Vacant Retail Walls", "Occupied Retail Walls"],
      },
      {
        title: "Office & Courtyard Space",
        items: ["Purchase", "Rental"],
      },
    ],
  },
  {
    name: "Sell / Rent",
    icon: Building2,
    href: "/sell",
  },
  {
    name: "Estimate",
    icon: Calculator,
    href: "/estimate",
  },
  {
    name: "Invest",
    icon: MapPin,
    href: "/invest",
  },
  {
    name: "Careers",
    icon: Briefcase,
    href: "/careers",
  },
  {
    name: "Contact",
    icon: Mail,
    href: "/contact",
  },
];
export function Header() {
  const { t } = useTranslation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    navigate("/login");
  };
  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-white shadow">
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          <Link to="/" className="-m-1.5 p-1.5">
            <span className="text-2xl font-bold text-gray-900">
              {t("realestate.pro")}
            </span>
          </Link>
        </div>

        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">{t("open.main.menu")}</span>
            <Menu className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>

        <div className="hidden lg:flex lg:gap-x-12">
          {navigation.map((item) =>
            item.href ? (
              <Link
                key={item.name}
                to={item.href}
                className="flex items-center gap-2 text-sm font-semibold leading-6 text-gray-900 hover:text-gray-600"
              >
                <item.icon className="h-4 w-4" />
                {item.name}
              </Link>
            ) : (
              <div key={item.name} className="relative group">
                <button className="flex items-center gap-2 text-sm font-semibold leading-6 text-gray-900 hover:text-gray-600">
                  <item.icon className="h-4 w-4" />
                  {item.name}
                </button>
                {item.items && (
                  <div className="absolute left-0 w-96 mt-2 bg-white rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                    <div className="p-4">
                      {item.items.map((section, idx) => (
                        <div
                          key={
                            typeof section === "string"
                              ? section
                              : section.title
                          }
                          className={cn(
                            "py-2",
                            idx !== 0 && "border-t border-gray-100",
                          )}
                        >
                          {typeof section === "string" ? (
                            <Link
                              to="/search"
                              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md"
                            >
                              {section}
                            </Link>
                          ) : (
                            <div>
                              <h3 className="px-4 py-2 text-sm font-semibold text-gray-900">
                                {section.title}
                              </h3>
                              <div className="space-y-1">
                                {section.items.map((subItem) => (
                                  <Link
                                    key={subItem}
                                    to="/search"
                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md"
                                  >
                                    {subItem}
                                  </Link>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ),
          )}
        </div>

        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          {isAuthenticated ? (
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-700">
                {t("welcome.")}
                {user?.firstName}
              </span>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 text-sm font-semibold leading-6 text-gray-900 hover:text-gray-600"
              >
                <LogOut className="h-4 w-4" />
                {t("log.out")}
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="text-sm font-semibold leading-6 text-gray-900 hover:text-gray-600"
            >
              {t("log.in")}
              <span aria-hidden="true">&rarr;</span>
            </Link>
          )}
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        className={cn(
          "lg:hidden",
          mobileMenuOpen ? "fixed inset-0 z-50" : "hidden",
        )}
      >
        <div className="fixed inset-0 bg-black/20" aria-hidden="true" />
        <div className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <Link to="/" className="-m-1.5 p-1.5">
              <span className="text-2xl font-bold text-gray-900">
                {t("realestate.pro")}
              </span>
            </Link>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">{t("close.menu")}</span>
              <X className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href || "/search"}
                    className="flex items-center gap-2 -mx-3 rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <item.icon className="h-4 w-4" />
                    {item.name}
                  </Link>
                ))}
              </div>
              <div className="py-6">
                {isAuthenticated ? (
                  <button
                    onClick={() => {
                      handleLogout();
                      setMobileMenuOpen(false);
                    }}
                    className="flex items-center gap-2 -mx-3 rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    <LogOut className="h-4 w-4" />
                    {t("log.out")}
                  </button>
                ) : (
                  <Link
                    to="/login"
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {t("log.in")}
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
