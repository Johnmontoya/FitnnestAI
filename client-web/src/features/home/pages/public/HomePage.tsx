import React from 'react';
import { LuActivity } from 'react-icons/lu';
import Header from '../../components/Header';
import Hero from '../../components/Hero';
import Stats from '../../components/Stats';
import Feature from '../../components/Feature';
import Testimonial from '../../components/Testimonial';
import CTA from '../../components/CTA';
import Footer from '../../components/Footer';

const HomePage: React.FC = () => {

    return (
        <div className="min-h-screen bg-[#0a150a]">
            {/* Header/Navigation */}
            <Header />

            {/* Hero Section */}
            <Hero />

            {/* Categories */}
            <section className="py-12 px-4 sm:px-6 lg:px-8 border-y border-gray-100/20">
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
            <Stats />

            {/* Features Section */}
            <Feature />

            {/* Testimonial Section */}
            <Testimonial />

            {/* CTA Section */}
            <CTA />

            {/* Footer */}
            <Footer />
        </div>
    );
};

export default HomePage;