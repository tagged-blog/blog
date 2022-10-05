import { GetStaticProps } from 'next'
import Image from 'next/image'
import React, { useState } from 'react'
import Header from '../../components/Header'
import { urlFor } from '../../sanity/sanity'
import { getClient } from '../../sanity/sanity.server'
import { Post } from '../../typings'
import PotableText from 'react-portable-text'
import { useForm, SubmitHandler } from 'react-hook-form'

interface IFormInput {
  _id: string
  name: string
  email: string
  comment: string
}

interface Props {
  post: Post
}

const Post = ({ post }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>()
  const [submitted, setSubmitted] = useState(false)

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    fetch('/api/createComment', {
      method: 'POST',
      body: JSON.stringify(data),
    })
      .then(() => {
        setSubmitted(true)
      })
      .catch((err) => {
        setSubmitted(false)
      })
  }

  return (
    <main>
      <Header />

      <div className="w-full h-96 relative">
        <Image
          src={urlFor(post.mainImage).url()}
          layout="fill"
          objectFit="cover"
          sizes="100vw"
          alt="Post Image"
        />
      </div>

      <article className="max-w-6xl mx-auto p-5">
        <h1 className="text-3xl mt-10 mb-3">
          {post.title}
        </h1>
        <h2 className="text-xl font-light text-gray-500 mb-2">
          {post.description}
        </h2>

        <div className="flex items-center">
          <div className="w-12 h-12 rounded-full overflow-hidden">
            {post.author.image && (
              <Image
                src={urlFor(post.author.image).url()}
                layout="responsive"
                width="1px"
                height="1px"
                objectFit="contain"
                sizes="5vw"
                alt="Author Image"
              />
            )}
          </div>
          <p>
            Blog post by{' '}
            <span className="text-green-600">
              {post.author.name}
            </span>{' '}
            - Published at{' '}
            {new Date(post._createAt).toLocaleString()}
          </p>
        </div>

        <div>
          <PotableText
            className=""
            dataset={
              process.env.NEXT_PUBLIC_SANITY_DATASET!
            }
            projectId={
              process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!
            }
            content={post.body}
            serializers={{
              h1: (props: any) => (
                <h1
                  className="text-2xl font-bold my-5"
                  {...props}
                />
              ),
              h2: (props: any) => (
                <h2
                  className="text-xl font-bold my-5"
                  {...props}
                />
              ),
              li: ({ children }: any) => (
                <li className="ml-4 list-disc">
                  {children}
                </li>
              ),
              link: ({ href, children }: any) => (
                <a
                  href={href}
                  className="text-blue-500 hover: underline"
                >
                  {children}
                </a>
              ),
            }}
          />
        </div>
      </article>

      <hr className="max-w-lg my-5 mx-auto border border-yellow-500" />

      <div className="max-w-4xl mx-auto p-5">
        {submitted ? (
          <h1 className="text-center text-lg text-green-500">
            Submitted
          </h1>
        ) : (
          <form
            onSubmit={handleSubmit(onSubmit)}
            action="#"
            method="POST"
          >
            <input
              {...register('_id')}
              type="hidden"
              name="_id"
              value={post._id}
            />
            <h4 className="text-3xl font-bold mb-4">
              Leave a comment below!
            </h4>
            <div className="overflow-hidden shadow sm:rounded-md">
              <div className="bg-white px-4 py-5 sm:p-6">
                <div className="grid grid-cols-6 gap-6">
                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Name
                    </label>
                    <input
                      {...register('name', {
                        required: true,
                      })}
                      type="text"
                      name="name"
                      id="name"
                      autoComplete="given-name"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>

                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Email
                    </label>
                    <input
                      {...register('email', {
                        required: true,
                      })}
                      type="email"
                      name="email"
                      id="email"
                      autoComplete="family-name"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>

                  <div className="col-span-12">
                    <label
                      htmlFor="comment"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Comment
                    </label>
                    <textarea
                      {...register('comment', {
                        required: true,
                      })}
                      rows={6}
                      name="comment"
                      id="comment"
                      autoComplete="email"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                <button
                  type="submit"
                  className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Save
                </button>
              </div>
            </div>
            <div className="p-5">
              {errors.name && (
                <span className="text-red-500 block">
                  The Name Field is required
                </span>
              )}
              {errors.comment && (
                <span className="text-red-500 block">
                  The Comment Field is required
                </span>
              )}
              {errors.email && (
                <span className="text-red-500 block">
                  The Email Field is required
                </span>
              )}
            </div>
          </form>
        )}

        {/* Comment */}
        <div>
          <h3 className="text-4xl">Comments</h3>

          <hr className="pb-2" />

          {post.comments.map((cmt) => (
            <div key={cmt._id}>
              <p>
                <span className="text-yellow-500">
                  {cmt.name}:{' '}
                </span>
                {cmt.comment}
              </p>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}

export default Post

export const getStaticPaths = async () => {
  const query = `
    *[_type == "post"]{
      _id,
      slug {
        current
      }
    }
  `

  const posts = await getClient().fetch(query)

  const paths = posts.map((post: Post) => ({
    params: {
      slug: post.slug.current,
    },
  }))

  return {
    paths,
    fallback: 'blocking',
  }
}

export const getStaticProps: GetStaticProps = async ({
  params,
}) => {
  const query = `
  *[_type == "post" && slug.current == $slug][0] {
    _id,
    _createdAt,
    title,
    author -> {
     name,
     image
    },
    'comments': *[
      _type == "comment" &&
      post._ref == ^._id &&
      approved == true],
    description,
    mainImage,
    slug,
    body
  }
  `

  const post = await getClient().fetch(query, {
    slug: params?.slug,
  })

  if (!post) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      post,
    },
    revalidate: 60, // After 60 seconds, The new version will be generated
  }
}
