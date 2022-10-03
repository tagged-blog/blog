import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Header from '../components/Header'
import HomeBanner from '../components/HomeBanner'
import { getClient } from '../sanity/sanity.server'
import { Post } from '../typings'
interface Props {
  posts: [Post]
}

export default function Home({ posts }: Props) {
  console.log(posts)
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

export const getServerSideProps = async () => {
  const query = `*[_type == "post"] {
      _id,
      title,
      author -> {
      name,
      image
      },
      description,
      mainImage,
      slug,
    }`

  const posts = await getClient().fetch(query)

  return {
    props: {
      posts,
    },
  }
}
