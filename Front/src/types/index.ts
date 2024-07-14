import {z} from 'zod'

const authSchema = z.object({
    name: z.string(),
    lastName: z.string(),
    email: z.string().email(),
    user: z.string(),
    password: z.string(),
    password_confirmation: z.string(),
    token:z.string()
})

type Auth = z.infer<typeof authSchema>

export type UserLoginForm = Pick<Auth,'email' | 'password'>

export type UserRegistrationForm = Pick<Auth,'email' | 'password' | 'password_confirmation' | 'lastName' | 'name' | 'user'>

export type ConfirmToken = Pick<Auth,'token'> 