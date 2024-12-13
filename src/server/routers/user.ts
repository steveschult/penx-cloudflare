import { z } from 'zod'
import { db } from '../db'
import { getCustomers } from '../functions/customers'
import { protectedProcedure, publicProcedure, router } from '../trpc'

export const userRouter = router({
  customers: protectedProcedure.query(async ({ ctx, input }) => {
    const customers = await getCustomers()
    return customers
  }),

  list: publicProcedure.query(async ({ ctx, input }) => {
    return db.query.users.findMany()
  }),
})
