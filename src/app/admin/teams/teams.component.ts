import { Component, OnInit } from '@angular/core';
import {first} from "rxjs";

import {User} from "../../_models/user.interface";
import {AuthService} from "../../services-and-shared/auth.service";
import {AdminService} from "../../services-and-shared/admin.service";
import {Team} from "../../_models/game";

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css']
})
export class TeamsComponent implements OnInit {

  teamList?: Team[]
  teams!: Team[]
  constructor(
    private authService: AuthService,
    private adminService: AdminService,
  ) {}

  ngOnInit(): void {
    this.adminService.getAllTeams().pipe(first()).subscribe(teams => {
      this.teams = teams
    })
  }

  public deleteTeams(): void {
    // for (let changeTeam of this.teamList!) {
    //   this.adminService.deleteTeam(changeTeam.id!)
    //     .pipe(first())
    //     .subscribe(() => this.teams = this.teams.filter(x => x.id !== changeTeam.id!));
    // }
    // this.teamList = undefined
  }
  public createTeam() {
    
  }

}
