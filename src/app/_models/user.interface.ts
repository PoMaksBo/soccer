export interface User {
  id?: number
  token?: string
  username: string
  password: string
  firstname?: string
  lastname?: string
  admin?: boolean
  status: number
}
