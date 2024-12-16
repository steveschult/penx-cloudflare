import { ContentRender } from '@/components/ContentRender/ContentRender'
import { getSite } from '@/lib/fetchers'
import { loadTheme } from '@/lib/loadTheme'

export const runtime = 'edge'
// export const runtime = 'edge'
// export const dynamic = 'force-static'
// export const revalidate = 3600 * 24

export default async function HomePage() {
  const [site] = await Promise.all([getSite()])
  const { AboutPage } = await loadTheme()

  if (!AboutPage) {
    return <div>Theme not found</div>
  }

  return <AboutPage site={site} ContentRender={ContentRender} />
}
