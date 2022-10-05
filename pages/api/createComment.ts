// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { getClient } from '../../sanity/sanity.server'

export default async function createComment(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { _id, name, email, comment } = JSON.parse(req.body)

  try {
    await getClient().create({
      _type: 'comment',
      post: {
        _type: 'reference',
        _ref: _id,
      },
      name,
      email,
      comment,
    })
  } catch (err) {
    return res
      .status(500)
      .json({ message: `Couldn't submit comment`, err })
  }

  return res.status(200).json({ name: 'Comment submiited' })
}
