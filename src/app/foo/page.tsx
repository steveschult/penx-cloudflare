import { Foo } from './Foo'

export const runtime = 'edge'

export default async function Home() {
  return (
    <div>
      <Foo></Foo>
    </div>
  )
}
