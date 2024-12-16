import { getSite, getTags, getTagWithPost } from '@/lib/fetchers'
import { loadTheme } from '@/lib/loadTheme'
import { Metadata } from 'next'

export const runtime = 'edge'
// export const runtime = 'edge'
// export const dynamic = 'force-static'
// export const revalidate = 3600 * 24

export async function generateMetadata(): Promise<Metadata> {
  const site = await getSite()
  return {
    title: `Tags | ${site.name}`,
    description: site.description,
  }
}

// export const generateStaticParams = async () => {
//   const tags = await getTags()
//   const paths = tags.map((tag) => ({
//     tag: encodeURI(tag.name),
//   }))
//   return paths
// }

export default async function TagPage({ params }: { params: { tag: string } }) {
  const tagName = decodeURI(params.tag)

  const [tagWithPosts, tags] = await Promise.all([
    getTagWithPost(tagName),
    getTags(),
  ])

  const posts = tagWithPosts?.postTags.map((postTag) => postTag.post) || []

  const { TagDetailPage } = await loadTheme()

  return <TagDetailPage posts={posts} tags={tags} />
}
