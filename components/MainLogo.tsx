import React from 'react'
import Image from 'next/image'
import MainLogoImg from '../assets/images/main-logo.png'
import Link from 'next/link'

const MainLogo = () => {
  return (
    <Link href={'/'}>
      <div className="page-logo w-44">
        <Image
          alt="Main Page Logo"
          src={MainLogoImg}
          layout="responsive"
          objectFit="contain"
          sizes="20vw"
        />
      </div>
    </Link>
  )
}

export default MainLogo
