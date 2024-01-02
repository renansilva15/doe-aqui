import { z } from 'zod'

export const RegisterCampaignSchema = z.object({
  title: z
    .string({
      required_error: 'Title is required',
    })
    .min(1, 'Title must not be empty'),
  description: z
    .string({
      required_error: 'Description is required',
    })
    .min(1, 'Description must not be empty'),
  pixKey: z
    .string({
      required_error: 'Pix Key is required',
    })
    .min(1, 'Pix Key must not be empty'),
})

// export const LoginUserSchema = z.object({
//   email: z
//     .string({
//       required_error: 'Email is required',
//     })
//     .min(1, 'Email is required')
//     .email('Email is invalid'),
//   password: z
//     .string({
//       required_error: 'Password is required',
//     })
//     .min(1, 'Password is required')
//     .min(8, 'Password must be at least 8 characters'),
// })

// export type LoginUserInput = z.infer<typeof LoginUserSchema>
export type RegisterCampaignInput = z.infer<typeof RegisterCampaignSchema>
