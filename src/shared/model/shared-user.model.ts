import { Role } from 'src/shared/constants/auth.constant'
import { z } from 'zod'

export const UserSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  name: z.string().min(1).max(100),
  phone: z.string().min(9).max(15),
  password: z.string().min(6).max(100),
  role: z.enum([Role.Admin, Role.User]),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export type UserType = z.infer<typeof UserSchema>
