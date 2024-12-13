import { Foo } from './Foo'
import { Users } from './Users'

export const runtime = 'edge'

export default async function Home() {
  return (
    <div>
      <Foo></Foo>
      <Users></Users>
    </div>
  )
}
