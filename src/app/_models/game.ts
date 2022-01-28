import {User} from "./user.interface";

export class Game {
  team1!: Team
  team2! : Team
  gameDate!: Date
  winTeam1?: boolean
  winTeam2?: boolean
  id?: number
}

export class Team {
  id!: number
  teamName!: string
  player1!: User
  player2?: User
}
