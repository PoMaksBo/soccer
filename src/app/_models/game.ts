import {User} from "./user.interface";

export class Game {
  team1?: Team
  team2? : Team
  gameDate!: Date
  winnerTeam?: string
  looserTeam?: string
  playerWinner?: string
  looserWinner?: string
  id?: number
  alias!: string
  gameStatus?: boolean
  comment?: string
  player1?: User
  player2?: User
}

export class Team {
  id?: number
  teamName!: string
  teamStatus?: number
  player1?: User
  player2?: User
}
