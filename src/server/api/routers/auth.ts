import { createTRPCRouter, publicProcedure } from '../trpc'
import bcrypt from 'bcrypt'
import { signJwt } from '../utils/jwt'
import type { Prisma } from '@prisma/client'
import { loginSchema, signUpSchema } from '~/server/api/utils/validations'

export const authRouter = createTRPCRouter({
    register: publicProcedure
        .input(signUpSchema)
        .mutation(async ({ ctx, input }) => {
            const { firstName, lastName, email, password } = input

            const hashedPassword: string = await bcrypt.hash(password, 10)

            const existingUser: Prisma.UserUncheckedCreateInput | null =
                await ctx.db.user.findUnique({
                    where: { email: email },
                })

            if (existingUser) {
                throw new Error('User already exists')
            }

            const newUser = await ctx.db.user.create({
                data: {
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                    password: hashedPassword,
                },
            })

            if (newUser === undefined) {
                throw new Error('Failed to create user')
            }

            const token: string = signJwt(newUser.id.toString())

            return { status: 'success', user: newUser, token: token }
        }),

    login: publicProcedure
        .input(loginSchema)
        .mutation(async ({ ctx, input }) => {
            const { email, password } = input

            const user = await ctx.db.user.findUnique({
                where: { email },
            })

            if (!user?.password) {
                throw new Error('Invalid login credentials')
            }

            const passwordMatch = await bcrypt.compare(password, user.password)

            if (!passwordMatch) {
                throw new Error('Invalid login credentials')
            }

            const token: string = signJwt(user.id.toString())

            return {
                status: 'success',
                user: {
                    id: user.id,
                    email: user.email,
                    firstName: user.firstName,
                    lastName: user.lastName,
                },
                token: token,
            }
        }),
})
