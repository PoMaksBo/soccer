import {Component, DoCheck, OnDestroy, OnInit} from '@angular/core';
import {first, Subscription} from "rxjs";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";

import {User} from "../../../_models/user.interface";
import {AuthService} from "../../../services-and-shared/auth.service";
import {Team} from "../../../_models/game";
import {AdminService} from "../../../services-and-shared/admin.service";
import {GameService} from "../../../services-and-shared/game.service";

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})

export class CreateComponent implements OnInit, DoCheck, OnDestroy {

  public player2!: User
  public player3!: User
  public player4!: User
  public activeUser!: User
  public users!: User[]
  public player2form = new FormControl()
  public player3form = new FormControl('', Validators.required)
  public player4form = new FormControl()
  public teams!: Team[]
  public changeTeams: FormGroup
  private userSub!: Subscription
  private allTeamsSub!: Subscription
  public command = false
  public team1!: Team
  public team2!: Team
  public gameName!: string

  constructor(
    private authService: AuthService,
    private router: Router,
    private adminService: AdminService,
    private formBuilder: FormBuilder,
    private gameService: GameService
  ) {
    // this.activeUser = this.authService.userValue
    this.authService.user.subscribe(player => this.activeUser = player)
    this.changeTeams = this.formBuilder.group({
      team1: ['', Validators.required],
      team2: ['', Validators.required]
    })
  }

  ngOnInit() {
    this.userSub = this.authService.getAll().pipe(first()).subscribe(users =>{
      this.users = users
      let id = +this.activeUser.id!
      this.users = this.users.filter((user) => user.id !== id).filter((user) => user.is_superuser !== true).filter((user) => user.player_status !== false)
    })
    this.allTeamsSub = this.adminService.getAllTeams().pipe(first()).subscribe(teams => {
      this.teams = teams
      this.teams = this.teams.filter((team) => team.team_status !== 0)
    })

  }

  ngDoCheck(): void {
    if (this.player2form.value) {
      this.users = this.users.filter((user) => {
        if (user.username === this.player2form.value) {
          this.player2 = user
        }
        return user.username !== this.player2form.value
      })
    }
    if (this.player3form.value) {
      this.users = this.users.filter((user) => {
        if (user.username === this.player3form.value) {
          this.player3 = user
        }
        return user.username !== this.player3form.value
      })
    }
    if (this.player4form.value) {
      this.users = this.users.filter((user) => {
        if (user.username === this.player4form.value) {
          this.player4 = user
        }
        return user.username !== this.player4form.value
      })
    }
  }

  ngOnDestroy(): void {
    this.allTeamsSub.unsubscribe()
    this.userSub.unsubscribe()
  }

  public clearPlayer(userForm: FormControl, formValue: User): void {
    userForm.reset()
    this.users.push(formValue)
  }

  public createGameClick(): void {
    let bundle
    if (this.command) {
      this.team1 = this.changeTeams.value.team1
      this.team2 = this.changeTeams.value.team2
      bundle = {
        team1 : this.team1,
        team2 : this.team2,
        dt: new Date(),
        alias: this.gameName
      }
    } else {
      bundle = {
        player1 : this.activeUser,
        player2 : this.player3,
        dt: new Date(),
        alias: this.gameName
      }
    }
    localStorage.setItem('gameBundle', JSON.stringify(bundle))
    this.router.navigate(['../game/results'])
  }

}
