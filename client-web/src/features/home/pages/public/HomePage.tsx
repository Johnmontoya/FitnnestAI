import React from 'react';
import { BiBarChart, BiCheck, BiStar, BiTrendingUp, BiUser } from 'react-icons/bi';
import { LuActivity, LuScale, LuUtensils } from 'react-icons/lu';
import { useNavigate } from 'react-router-dom';
import { BsInstagram, BsLinkedin, BsTwitter } from 'react-icons/bs';
import { FiShare2, FiThumbsUp } from 'react-icons/fi';

const HomePage: React.FC = () => {
    const navigate = useNavigate();

    const stats = [
        {
            icon: BiUser,
            label: "ACTIVE USERS",
            value: "50,000+",
            change: "+62% increase this month",
            color: "#00ff66"
        },
        {
            icon: BiTrendingUp,
            label: "LOGS RECORDED",
            value: "1.2M+",
            change: "+35% increase this month",
            color: "#00ff66"
        },
        {
            icon: LuScale,
            label: "WEIGHT LOST",
            value: "250k lbs",
            change: "+5% increase this month",
            color: "#00ff66"
        },
    ];

    const features = [
        {
            icon: LuUtensils,
            title: "Smart Meal Logging",
            description: "Snap, log, and go. Use simple to catalogue your nutrition instantly and stay on track with your customized diet plan.",
            color: "#00ff66"
        },
        {
            icon: LuActivity,
            title: "Activity Tracking",
            description: "Log workouts in seconds. From HIIT to Yoga, we've got you covered with quick-log presets for over 500 exercises.",
            color: "#00ff66"
        },
        {
            icon: BiBarChart,
            title: "Progress Insights",
            description: "Visualize your journey with detailed charts and health trends that keep you motivated through every milestone.",
            color: "#00ff66"
        },
    ];

    const navItems = [
        { label: "Features", href: "#features" },
        { label: "Plans", href: "#pricing" },
        { label: "Community", href: "#community" },
        { label: "About", href: "#about" },
    ];

    const footerLinks = {
        Product: ["Features", "Integrations", "Pricing", "Changelog"],
        Resources: ["Community", "Blog", "FAQ", "API"],
        Legal: ["Privacy Policy", "Terms of Service", "Cookie Policy"],
    };

    return (
        <div className="min-h-screen bg-white">
            {/* Header/Navigation */}
            <header className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        {/* Logo */}
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-[#00ff66] rounded-lg flex items-center justify-center">
                                <LuActivity className="w-5 h-5 text-black" />
                            </div>
                            <span className="text-black text-xl font-bold">FITTRACK</span>
                        </div>

                        {/* Navigation */}
                        <nav className="hidden md:flex items-center gap-8">
                            {navItems.map((item) => (
                                <a
                                    key={item.label}
                                    href={item.href}
                                    className="text-gray-600 hover:text-black transition-colors font-medium"
                                >
                                    {item.label}
                                </a>
                            ))}
                        </nav>

                        {/* Auth Buttons */}
                        <div className="flex items-center gap-4">
                            <button
                                onClick={() => navigate('/login')}
                                className="text-gray-600 hover:text-black font-medium transition-colors"
                            >
                                Login
                            </button>
                            <button
                                onClick={() => navigate('/signup')}
                                className="bg-[#00ff66] hover:bg-[#00dd55] text-black font-semibold px-6 py-2 rounded-lg transition-all"
                            >
                                Get Started
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Hero Section */}
            <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 bg-[#00ff66] bg-opacity-10 text-[#00ff66] px-4 py-2 rounded-full mb-8">
                        <BiCheck className="w-4 h-4" />
                        <span className="text-sm font-semibold">YOUR PERSONAL AI GYM GURU</span>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        {/* Left Column - Text */}
                        <div>
                            <h1 className="text-6xl font-bold text-black mb-6 leading-tight">
                                Transform<br />
                                Your Life,<br />
                                <span className="text-[#00ff66]">One Calorie</span> at<br />
                                a Time
                            </h1>

                            <p className="text-gray-600 text-lg mb-8 max-w-md">
                                Track your activity, and reach your fitness goals with our intuitive companion.
                                Designed for clarity, speed, and real results.
                            </p>

                            <div className="flex items-center gap-4 mb-6">
                                <button
                                    onClick={() => navigate('/signup')}
                                    className="bg-[#00ff66] hover:bg-[#00dd55] text-black font-semibold px-8 py-4 rounded-lg transition-all text-lg"
                                >
                                    Get Started for Free
                                </button>
                                <button className="text-black hover:text-gray-600 font-semibold transition-colors">
                                    Learn More
                                </button>
                            </div>

                            <div className="flex items-center gap-3 text-gray-600">
                                <div className="flex -space-x-2">
                                    <div className="w-8 h-8 rounded-full bg-gray-300 border-2 border-white"></div>
                                    <div className="w-8 h-8 rounded-full bg-gray-400 border-2 border-white"></div>
                                    <div className="w-8 h-8 rounded-full bg-gray-500 border-2 border-white"></div>
                                </div>
                                <span className="text-sm font-medium">Join 50,000+ others today</span>
                            </div>
                        </div>

                        {/* Right Column - Hero Image */}
                        <div className="relative">
                            <div className="bg-gradient-to-br from-[#00ff66] to-[#00dd55] rounded-3xl p-8 aspect-[4/3] flex items-end justify-between overflow-hidden">
                                {/* Placeholder for workout image */}
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="text-center text-black opacity-20">
                                        <LuActivity className="w-32 h-32 mx-auto mb-4" />
                                        <p className="text-xl font-bold">Workout Image</p>
                                    </div>
                                </div>

                                <div className="relative z-10 bg-white bg-opacity-20 backdrop-blur-sm rounded-2xl px-6 py-4">
                                    <p className="text-black font-bold text-lg">Full Body HIIT</p>
                                </div>

                                <div className="relative z-10 bg-white bg-opacity-20 backdrop-blur-sm rounded-2xl px-6 py-4">
                                    <p className="text-black font-bold text-4xl">450</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Categories */}
            <section className="py-12 px-4 sm:px-6 lg:px-8 border-y border-gray-200">
                <div className="max-w-7xl mx-auto">
                    <div className="flex items-center justify-between overflow-x-auto">
                        {['HEALTHLINE', 'WELLNESS', 'ACTIVE', 'VITALITY'].map((category) => (
                            <div key={category} className="flex items-center gap-3 px-6">
                                <LuActivity className="w-5 h-5 text-gray-400" />
                                <span className="text-gray-400 font-semibold whitespace-nowrap">{category}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
                <div className="max-w-7xl mx-auto">
                    <div className="grid md:grid-cols-3 gap-8">
                        {stats.map((stat, index) => {
                            const Icon = stat.icon;
                            return (
                                <div
                                    key={index}
                                    className="bg-white rounded-2xl p-8 border border-gray-200 hover:border-[#00ff66] transition-all"
                                >
                                    <div className="flex items-center gap-3 mb-4">
                                        <div
                                            className="w-10 h-10 rounded-lg flex items-center justify-center"
                                            style={{ backgroundColor: `${stat.color}22` }}
                                        >
                                            <Icon className="w-5 h-5" style={{ color: stat.color }} />
                                        </div>
                                        <span className="text-gray-600 text-sm font-semibold">{stat.label}</span>
                                    </div>
                                    <p className="text-4xl font-bold text-black mb-2">{stat.value}</p>
                                    <p className="text-[#00ff66] text-sm font-medium">{stat.change}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-20 px-4 sm:px-6 lg:px-8" id="features">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-5xl font-bold text-black mb-4">
                            Everything you need to<br />
                            <span className="text-[#00ff66]">succeed</span>
                        </h2>
                        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                            Our comprehensive tools make health monitoring effortless, engaging, and actually fun.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {features.map((feature, index) => {
                            const Icon = feature.icon;
                            return (
                                <div
                                    key={index}
                                    className="bg-white rounded-2xl p-8 border border-gray-200 hover:border-[#00ff66] transition-all"
                                >
                                    <div
                                        className="w-14 h-14 rounded-xl flex items-center justify-center mb-6"
                                        style={{ backgroundColor: `${feature.color}22` }}
                                    >
                                        <Icon className="w-7 h-7" style={{ color: feature.color }} />
                                    </div>
                                    <h3 className="text-xl font-bold text-black mb-3">{feature.title}</h3>
                                    <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Testimonial Section */}
            <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
                <div className="max-w-7xl mx-auto">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        {/* Left - Success Story Card */}
                        <div className="relative">
                            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl p-12 text-white">
                                <div className="mb-8">
                                    <p className="text-sm font-semibold mb-2 opacity-60">SUCCESS</p>
                                    <p className="text-sm font-semibold mb-2 opacity-60">STORY</p>
                                    <p className="text-sm font-semibold opacity-60">WITH HUMBLE SIPF WORK</p>
                                </div>

                                <div className="absolute bottom-8 left-8">
                                    <div className="bg-[#00ff66] text-black font-bold text-2xl px-6 py-3 rounded-xl inline-block">
                                        -35lb
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right - Testimonial */}
                        <div>
                            <div className="flex gap-1 mb-6">
                                {[...Array(5)].map((_, i) => (
                                    <BiStar key={i} className="w-5 h-5 fill-[#00ff66] text-[#00ff66]" />
                                ))}
                            </div>

                            <blockquote className="text-3xl font-medium text-black mb-8 leading-relaxed italic">
                                "This app completely changed how I look at my daily habits. The meal logging is so fast I actually
                                stick with it for the first time in years."
                            </blockquote>

                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-12 h-12 rounded-full bg-gray-300"></div>
                                <div>
                                    <p className="text-black font-semibold">Sarah Jenkins</p>
                                    <p className="text-gray-600 text-sm">Member since March 2024</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
                                <button className="flex items-center gap-2 text-[#00ff66] hover:text-[#00dd55] font-medium transition-colors">
                                    <FiThumbsUp className="w-4 h-4" />
                                    <span>156 Likes</span>
                                </button>
                                <button className="flex items-center gap-2 text-gray-600 hover:text-black font-medium transition-colors">
                                    <FiShare2 className="w-4 h-4" />
                                    <span>Share Story</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-5xl mx-auto">
                    <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl p-12 text-center text-white">
                        <h2 className="text-4xl font-bold mb-4">
                            Ready to start your<br />journey today?
                        </h2>
                        <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
                            Join thousands of others who have simplified their fitness and achieved the body they always wanted.
                        </p>

                        <div className="flex items-center justify-center gap-4">
                            <button
                                onClick={() => navigate('/signup')}
                                className="bg-[#00ff66] hover:bg-[#00dd55] text-black font-semibold px-8 py-4 rounded-lg transition-all text-lg"
                            >
                                Get Started for Free
                            </button>
                            <button className="border-2 border-white text-white hover:bg-white hover:text-black font-semibold px-8 py-4 rounded-lg transition-all">
                                View Pricing
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-white border-t border-gray-200 py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="grid md:grid-cols-5 gap-8 mb-12">
                        {/* Logo Column */}
                        <div className="md:col-span-2">
                            <div className="flex items-center gap-2 mb-4">
                                <div className="w-8 h-8 bg-[#00ff66] rounded-lg flex items-center justify-center">
                                    <LuActivity className="w-5 h-5 text-black" />
                                </div>
                                <span className="text-black text-xl font-bold">FITTRACK</span>
                            </div>
                            <p className="text-gray-600 mb-6 max-w-xs">
                                FitTrack by Inc is a health and fitness app designed to track fitness and health goals
                                efficiently and smartly.
                            </p>
                            <div className="flex items-center gap-4">
                                <a href="#" className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors">
                                    <BsTwitter className="w-5 h-5 text-gray-600" />
                                </a>
                                <a href="#" className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors">
                                    <BsInstagram className="w-5 h-5 text-gray-600" />
                                </a>
                                <a href="#" className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors">
                                    <BsLinkedin className="w-5 h-5 text-gray-600" />
                                </a>
                            </div>
                        </div>

                        {/* Links Columns */}
                        {Object.entries(footerLinks).map(([category, links]) => (
                            <div key={category}>
                                <h3 className="text-black font-bold mb-4">{category}</h3>
                                <ul className="space-y-3">
                                    {links.map((link) => (
                                        <li key={link}>
                                            <a href="#" className="text-gray-600 hover:text-black transition-colors">
                                                {link}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>

                    {/* Bottom Bar */}
                    <div className="pt-8 border-t border-gray-200 flex flex-col md:flex-row items-center justify-between gap-4">
                        <p className="text-gray-600 text-sm">
                            © 2024 FitTrack Inc. All rights reserved.
                        </p>
                        <div className="flex items-center gap-6 text-sm">
                            <a href="#" className="text-gray-600 hover:text-black transition-colors flex items-center gap-2">
                                <LuActivity className="w-4 h-4 text-[#00ff66]" />
                                System Monitoring
                            </a>
                            <span className="text-gray-300">|</span>
                            <a href="#" className="text-gray-600 hover:text-black transition-colors">
                                Designed with Figma
                            </a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default HomePage;