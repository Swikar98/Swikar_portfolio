"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { MdOutlineClose } from 'react-icons/md';
import { VscThreeBars } from "react-icons/vsc";
import { Links } from '@/data/nav_data';

const Navbar = () => {
    const [isNavShowing, setIsNavShowing] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
            scrolled ? 'bg-[#0f0f23]/80 backdrop-blur-lg shadow-lg' : 'bg-transparent'
        }`}>
            <div className="max-w-7xl mx-auto px-6 lg:px-12">
                <div className="flex justify-between items-center py-4">
                    {/* Logo */}
                    <Link href="/" onClick={() => setIsNavShowing(false)} className="group">
                        <h2 className="text-2xl lg:text-3xl font-bold text-white">
                            <span className="gradient-text">{'<'}</span>
                            <span className="font-leckerli">Swikar</span>
                            <span className="gradient-text">{'/>'}</span>
                        </h2>
                    </Link>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden p-2 text-white hover:text-purple-400 transition-colors"
                        onClick={() => setIsNavShowing((prev) => !prev)}
                        aria-label="Toggle Navigation"
                    >
                        {isNavShowing ? (
                            <MdOutlineClose size={28} />
                        ) : (
                            <VscThreeBars size={28} />
                        )}
                    </button>

                    {/* Desktop Navigation */}
                    <ul className="hidden md:flex items-center gap-2">
                        {Links.map(({ name, path }, index) => (
                            <li key={index}>
                                <Link
                                    href={path}
                                    className={`relative px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                                        pathname === path
                                            ? 'text-white bg-gradient-to-r from-purple-500 to-pink-500'
                                            : 'text-white/70 hover:text-white hover:bg-white/10'
                                    }`}
                                >
                                    {name}
                                </Link>
                            </li>
                        ))}
                        <li>
                            <a
                                href="#contact"
                                className="ml-4 px-6 py-2 rounded-full text-sm font-medium text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:shadow-lg hover:shadow-purple-500/30 transition-all duration-300 hover:-translate-y-0.5"
                            >
                                Contact
                            </a>
                        </li>
                    </ul>
                </div>

                {/* Mobile Navigation */}
                <div className={`md:hidden overflow-hidden transition-all duration-300 ${
                    isNavShowing ? 'max-h-96 pb-6' : 'max-h-0'
                }`}>
                    <ul className="flex flex-col items-center gap-2 pt-4 border-t border-white/10">
                        {Links.map(({ name, path }, index) => (
                            <li key={index} className="w-full">
                                <Link
                                    href={path}
                                    className={`block w-full text-center px-5 py-3 rounded-xl text-base font-medium transition-all duration-300 ${
                                        pathname === path
                                            ? 'text-white bg-gradient-to-r from-purple-500 to-pink-500'
                                            : 'text-white/70 hover:text-white hover:bg-white/10'
                                    }`}
                                    onClick={() => setIsNavShowing(false)}
                                >
                                    {name}
                                </Link>
                            </li>
                        ))}
                        <li className="w-full mt-2">
                            <a
                                href="#contact"
                                className="block w-full text-center px-6 py-3 rounded-xl text-base font-medium text-white bg-gradient-to-r from-purple-500 to-pink-500"
                                onClick={() => setIsNavShowing(false)}
                            >
                                Contact
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
