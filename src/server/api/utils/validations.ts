import * as z from 'zod'

export const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
})

export const signUpSchema = loginSchema.extend({
    firstName: z.string(),
    lastName: z.string(),
})

export type LoginInput = z.infer<typeof loginSchema>
export type SignUpInput = z.infer<typeof signUpSchema>
