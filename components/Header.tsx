import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import MainLogo from './MainLogo'

export default function Header() {
  return (
    <header>
      <nav>
        <div className="nav-left">
          <MainLogo />
          <ul>
            <li>
              <Link href={'/'}>Hello</Link>
            </li>
          </ul>
        </div>
        <div className="nav-right"></div>
      </nav>
    </header>
  )
}
