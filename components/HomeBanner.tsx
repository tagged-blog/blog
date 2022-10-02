import Image from 'next/image'
import React from 'react'
import MediumIcon from '../assets/images/Medium-512.webp'

const HomeBanner = () => {
  return (
    <div
      className="home-banner flex justify-between items-center
     bg-yellow-500 border-y border-black py-10 lg:py-0"
    >
      <div className="home-banner-left px-10 space-y-5">
        <h1 className="text-6xl max-w-xl">
          <u>Medium</u> is a place to write, read and
          connect
        </h1>
        <p>
          It&apos;s easy and free to post your thinking and
          any toic and connect with milions of readers
        </p>
      </div>
      <div className="home-banner-right hidden md:block md:w-44 lg:w-1/4">
        <Image
          src={MediumIcon}
          layout="responsive"
          objectFit="contain"
          sizes="20vw"
          alt="Banner Image"
        />
      </div>
    </div>
  )
}

export default HomeBanner
