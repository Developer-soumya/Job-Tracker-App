import React from 'react';

import { Link } from 'react-router';

const Home = () => {
    return (
        <main className="min-h-screen bg-gradient-to-br from-[#0F2027] via-[#203A43] to-[#2C5364] text-white">
            {/* Hero Section */}
            <section className="flex flex-col justify-center items-center text-center h-screen px-4">
                <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight">
                    Track Your Job Applications<br /> With Ease 🚀
                </h1>
                <p className="text-lg md:text-xl text-gray-300 max-w-2xl mb-8">
                    Organize, monitor, and stay on top of your job hunt. Apply once, track forever.
                </p>

                {/* Call to Action */}
                <div className="flex gap-4 flex-wrap justify-center">
                    <Link to="/login">
                        <button className="bg-white text-[#203A43] px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition">
                            Get Started
                        </button>
                    </Link>
                    <Link to="/login">
                        <button className="border border-white px-6 py-3 rounded-full font-semibold hover:bg-white hover:text-[#203A43] transition">
                            Login
                        </button>
                    </Link>
                </div>
            </section>

            {/* Features Section */}
            <section className="bg-white text-[#203A43] py-20 px-4">
                <div className="max-w-6xl mx-auto text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-12">Why Use JobTracker?</h2>
                    <div className="grid gap-10 md:grid-cols-3 text-left">
                        <div className="p-6 rounded-lg shadow-md hover:shadow-xl transition">
                            <h3 className="text-xl font-semibold mb-2">📋 Smart Tracking</h3>
                            <p className="text-gray-600">Track each application status: Applied, Interviewed, Rejected, and more.</p>
                        </div>
                        <div className="p-6 rounded-lg shadow-md hover:shadow-xl transition">
                            <h3 className="text-xl font-semibold mb-2">📊 Visual Insights</h3>
                            <p className="text-gray-600">Get charts and statistics of your job hunt progress over time.</p>
                        </div>
                        <div className="p-6 rounded-lg shadow-md hover:shadow-xl transition">
                            <h3 className="text-xl font-semibold mb-2">🔔 Notifications</h3>
                            <p className="text-gray-600">Never miss a follow-up or interview reminder again with email alerts.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-[#203A43] py-6 text-center text-sm text-gray-400">
                © {new Date().getFullYear()} JobTracker. All rights reserved.
            </footer>
        </main>
    );
};

export default Home;
