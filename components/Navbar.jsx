"use client";
import { useState } from 'react';
import Link from 'next/link';
import { MdOutlineClose } from 'react-icons/md';
import { VscThreeBars } from "react-icons/vsc";
import { Links } from '@/data/nav_data';

const Navbar = () => {
    const [isNavShowing, setIsNavShowing] = useState(false);

    return (
        <nav className="sticky top-0 w-full  lg:px-48 lg:py-8 z-50">
            <div className="container mx-auto flex justify-between items-center">
                <Link href="/" className="logo" onClick={() => setIsNavShowing(false)}>
                    <h2 className="text-4xl font-leckerli p-6 font-bold">Swikar</h2>
                </Link>
                <button
                    className="md:hidden p-6"
                    onClick={() => setIsNavShowing((prev) => !prev)}
                    aria-label="Toggle Navigation"
                >
                    {isNavShowing ? <MdOutlineClose /> : <VscThreeBars />}
                </button>
                <ul className={`absolute md:static  md:flex md:flex-row md:items-center 
                 ${isNavShowing ? 'top-16' : '-top-40'} 
                 w-full md:w-auto transition-all duration-300 ease-in-out flex flex-col items-center 
                 ${isNavShowing ? 'block' : 'hidden'} 
                 gap-4 md:gap-16 bg-blue-900 text-center text-white lg:text-black font-semibold md:bg-transparent`}>
                    {Links.map(({ name, path }, index) => (
                        <li key={index} className="my-2 md:my-0">
                            <Link
                                href={path}
                                className={({ isActive }) => (isActive ? 'text-blue-500' : 'text-white')}
                                onClick={() => setIsNavShowing(false)}
                            >
                                {name}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
