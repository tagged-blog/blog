import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import MainLogo from './MainLogo'

export default function Header() {
  return (
    <header>
      <nav className="flex justify-between py-2 px-5">
        <div className="nav-left flex gap-4 items-center">
          <MainLogo />
          <ul className="hidden md:inline-flex items-center gap-5">
            <li className="py-1">
              <Link href={'/about'}>About</Link>
            </li>
            <li className="py-1">
              <Link href={'/contact'}>Contact</Link>
            </li>
            <li className="text-white px-4 py-1 bg-green-600 rounded-full">
              <Link href={'/follow'}>Follow</Link>
            </li>
          </ul>
        </div>
        <div className="nav-right flex items-center text-green-600">
          <ul className="flex items-center gap-4">
            <li className="px-4 py-1">
              <Link href={'/signin'}>Sign In</Link>
            </li>
            <li className="border px-4 py-1 rounded-full border-green-600">
              <Link href={'/signup'}>Get Started</Link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  )
}
