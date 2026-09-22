import { Link, useLocation } from "react-router-dom";
import { BarChart3 } from "lucide-react";

export default function Navbar() {
  const location = useLocation();

  const links = [
    { to: "/", label: "Home" },
    { to: "/demo", label: "Live Demo" },
    { to: "/dashboard", label: "Dashboard" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-card/80 backdrop-blur-xl border-b border-border/60 shadow-card">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center shadow-sm">
            <BarChart3 size={16} className="text-primary-foreground" />
          </div>
          <span className="font-display font-bold text-lg text-foreground">AccessMetrics</span>
        </Link>

        <div className="flex items-center gap-1">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                location.pathname === link.to
                  ? "bg-primary-light text-primary"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/demo"
            className="px-4 py-2 rounded-xl text-sm font-semibold bg-gradient-primary text-primary-foreground shadow-sm hover:opacity-90 transition-all"
          >
            View Live Demo
          </Link>
        </div>
      </div>
    </nav>
  );
}
