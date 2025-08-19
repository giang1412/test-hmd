export const Role = {
  Admin: 'ADMIN',
  User: 'USER',
} as const

export type RoleType = (typeof Role)[keyof typeof Role]
