'use client'

import { usePathname } from 'next/navigation';
import Link from 'next/link';

export default function Navbar() {
    const pathname = usePathname();

    return (
        <nav className="bg-white border-gray-200 dark:bg-gray-900">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Flight Radar</h1>
                </div>
                <div className="hidden w-full md:block md:w-auto" id="navbar-default">
                    <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                        <li>
                            <Link href="/" className={`block py-2 px-3  ${pathname === '/' ? 'text-blue-500' : 'text-white'} `} aria-current="page">Home</Link>
                        </li>
                        <li>
                            <Link href="/flights" className={`block py-2 px-3  ${pathname === '/flights' ? 'text-blue-500' : 'text-white'} `} aria-current="page">Vuelos</Link>
                        </li>
                        <li>
                            <Link href="/planes" className={`block py-2 px-3  ${pathname === '/planes' ? 'text-blue-500' : 'text-white'} `} aria-current="page">Aviones</Link>
                        </li>
                                
                    </ul>
                </div>
            </div>
        </nav>
    );
}