import { LuActivity } from "react-icons/lu";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
    const navigate = useNavigate();
    const navItems = [
        { label: "Home", href: "#features" },
        { label: "Planes", href: "#pricing" },
        { label: "Communidad", href: "#community" },
        { label: "Acerca de", href: "#about" },
    ];
    return (
        <header className="fixed top-0 left-0 right-0 border-b border-gray-100/20 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center">
                            <LuActivity className="w-5 h-5 text-black" />
                        </div>
                        <Link to="/" className="text-white text-xl font-bold">FITTRACK PRO</Link>
                    </div>

                    {/* Navigation */}
                    <nav className="hidden md:flex items-center gap-8">
                        {navItems.map((item) => (
                            <a
                                key={item.label}
                                href={item.href}
                                className="text-gray-300 hover:text-white transition-colors font-medium"
                            >
                                {item.label}
                            </a>
                        ))}
                    </nav>

                    {/* Auth Buttons */}
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => navigate('/login')}
                            className="text-gray-300 hover:text-white font-medium transition-colors"
                        >
                            Login
                        </button>
                        <button
                            onClick={() => navigate('/register')}
                            className="bg-emerald-500 hover:bg-emerald-600 text-black font-semibold px-6 py-2 rounded-lg transition-all"
                        >
                            Vamos a empezar
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;