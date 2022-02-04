import { Component, OnInit } from '@angular/core';
<<<<<<< HEAD
import {Team} from "../../../_models/game";
import {AdminService} from "../../../services-and-shared/admin.service";
import {first} from "rxjs";
import {User} from "../../../_models/user.interface";
=======
>>>>>>> a514326cac6e8b0f615840adf06c76e4b611fa6f

@Component({
  selector: 'app-teams-stat',
  templateUrl: './teams-stat.component.html',
  styleUrls: ['./teams-stat.component.css']
})
export class TeamsStatComponent implements OnInit {

<<<<<<< HEAD
  teams!: Team[]
  displayedColumns: string[] = ['id', 'team_name', 'team_rating']
  constructor(
    private teamService: AdminService
  ) {}

  ngOnInit(): void {
    this.teamService.getAllTeams().pipe(first()).subscribe(teams => {
      this.teams = teams
      this.teams = this.teams.sort((a: Team, b:Team) => b.team_rating! - a.team_rating!)
    })
=======
  constructor() { }

  ngOnInit(): void {
>>>>>>> a514326cac6e8b0f615840adf06c76e4b611fa6f
  }

}
