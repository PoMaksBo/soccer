import {User} from "./user.interface";

export interface Game {
  id?: number
  dt: Date
  team_winner?: Team
  team_opposer?: Team
  player_winner?: User
  player_opposer?: User
  alias: string
  game_status?: boolean
  comment?: string

}

export interface Team {
  id?: number
  team_name: string
  team_status?: number
  team_rating?: number
}

export interface LocalGame extends Game {
  player1?: User
  player2?: User// | undefined
  team1?: Team
  team2?: Team
}

export interface LocalTeam extends Team {
  player1?: User
  player2?: User
}
