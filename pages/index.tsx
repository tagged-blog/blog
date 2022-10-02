import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Header from '../components/Header'
import HomeBanner from '../components/HomeBanner'

const Home: NextPage = () => {
  return (
    <div className="home-page max-w-screen-2xl m-auto">
      <Head>
        <title>Medium Blog</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <div className="home-page-content">
        <HomeBanner />
      </div>
    </div>
  )
}

export default Home
