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

  imageUrl: z.string().nullable().optional(),
  goal: z.number().min(0, 'Goal must be a positive number').optional(),
})

export const UpdateCampaignSchema = z.object({
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
  totalRaised: z
    .number({
      required_error: 'Total Raised is required',
    })
    .min(0, 'Total Raised must be a positive number'),
  pixKey: z
    .string({
      required_error: 'Pix Key is required',
    })
    .min(1, 'Pix Key must not be empty'),
  imageUrl: z.string().nullable(),
  goal: z.number().min(0, 'Goal must be a positive number'),
})

export type RegisterCampaignInput = z.infer<typeof RegisterCampaignSchema>
export type UpdateCampaignInput = z.infer<typeof UpdateCampaignSchema>
