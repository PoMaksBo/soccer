export interface User {
  id?: number
  token?: string
  username: string
  password: string
  first_name?: string
  last_name?: string
  is_superuser?: boolean
  player_status: boolean
  player_rating: number
}
