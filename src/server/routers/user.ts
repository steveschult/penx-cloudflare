import { z } from 'zod'
import { getCustomers } from '../functions/customers'
import { protectedProcedure, router } from '../trpc'

export const userRouter = router({
  list: protectedProcedure.query(async ({ ctx, input }) => {
    const customers = await getCustomers()
    return customers
  }),
})
