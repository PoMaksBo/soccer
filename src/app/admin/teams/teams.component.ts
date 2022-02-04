import { Component, OnInit } from '@angular/core';
import {first} from "rxjs";

import {AuthService} from "../../services-and-shared/auth.service";
import {AdminService} from "../../services-and-shared/admin.service";
import {Team} from "../../_models/game";
import {FormControl, Validators} from "@angular/forms";
import {AlertService} from "../../services-and-shared/alert.service";

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css']
})
export class TeamsComponent implements OnInit {

  teamList?: Team[]
  teams!: Team[]
  team_name!: FormControl
  constructor(
    private authService: AuthService,
    private adminService: AdminService,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.adminService.getAllTeams().pipe(first()).subscribe(teams => {
      this.teams = teams
    })
    this.team_name = new FormControl('', Validators.required)
    this.alertService.clear();
  }

  // public deleteTeams(): void {
  //   for (let changeTeam of this.teamList!) {
  //     this.adminService.deleteTeam(changeTeam.id!)
  //       .pipe(first())
  //       .subscribe(() => this.teams = this.teams.filter(x => x.id !== changeTeam.id!));
  //   }
  //   this.teamList = undefined
  // }

  public createTeam(): void {
    this.alertService.clear()
    this.team_name.disable()
    let team: Team = {team_name: this.team_name.value}
    this.adminService.createTeam(team).pipe(first())
      .subscribe({
        next: () => {
          this.alertService.success('Команда создана');
          this.team_name.reset()
          this.team_name.enable()
        },
        error: error => {
          this.alertService.error(error);
          this.team_name.enable()
        }
      });
    this.adminService.getAllTeams().pipe(first()).subscribe(teams => {
      this.teams = teams
    })
  }

  public disableTeams(): void {
    for (let changeTeam of this.teamList!) {
      this.adminService.disableTeam(changeTeam.id!, changeTeam)
        .pipe(first())
        .subscribe({
          next: () => {
            this.alertService.success( `Статус команды ${changeTeam.team_name} изменен` );
            this.adminService.getAllTeams().pipe(first()).subscribe(teams => {
              this.teams = teams
            })
          },
          error: error => {
            this.alertService.error(error);
            console.warn(error)
          }
        });
    }
    this.teamList = undefined
  }

}
