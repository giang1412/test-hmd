export const Role = {
  Admin: 'ADMIN',
  User: 'USER',
} as const

export type RoleType = (typeof Role)[keyof typeof Role]

export const REQUEST_USER_KEY = 'user'
