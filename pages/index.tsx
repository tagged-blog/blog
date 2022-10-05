import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Header from '../components/Header'
import HomeBanner from '../components/HomeBanner'
import { getClient } from '../sanity/sanity.server'
import { Post } from '../typings'
import { urlFor } from '../sanity/sanity'
import Link from 'next/link'
interface Props {
  posts: [Post]
}

export default function Home({ posts }: Props) {
  return (
    <div className="home-page max-w-screen-2xl m-auto">
      <Head>
        <title>Medium Blog</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <div className="home-page-content">
        <HomeBanner />

        <section
          className="post-list grid grid-cols-1 
          sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6 p-2 md:p-6"
        >
          {posts.map((post) => (
            <Link
              href={`/post/${post.slug.current}`}
              key={post._id}
            >
              <div className="post group rounded-md overflow-hidden border border-slate-200 cursor-pointer">
                <div
                  className="post-image w-full h-60 relative group-hover:scale-105
                  transition-transform duration-200 ease-in-out"
                >
                  {post.mainImage && (
                    <Image
                      src={urlFor(post.mainImage).url()}
                      layout="fill"
                      width="1px"
                      height="1px"
                      objectFit="cover"
                      sizes="
                        (min-width: 1024px) 33vw,
                        (min-width: 768px) 50vw,
                        100vw"
                      alt="Post Image"
                    />
                  )}
                </div>
                <div className="post-content flex justify-between p-5 bg-white">
                  <div className="post-content__article">
                    <p className="text-lg font-bold">
                      {post.title}
                    </p>
                    <p className="text-xs">
                      {post.description} by{' '}
                      {post.author.name}
                    </p>
                  </div>
                  <div className="post-content__author">
                    <div className="h-12 w-12 rounded-full overflow-hidden">
                      {post.author.image && (
                        <Image
                          src={urlFor(
                            post.author.image
                          ).url()}
                          layout="responsive"
                          width="1px"
                          height="1px"
                          objectFit="contain"
                          sizes="5vw"
                          alt="Author Image"
                        />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </section>
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
