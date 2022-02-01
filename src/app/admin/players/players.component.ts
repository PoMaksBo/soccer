import { Component, OnInit } from '@angular/core';
import {User} from "../../_models/user.interface";
import {AuthService} from "../../services-and-shared/auth.service";
import {AdminService} from "../../services-and-shared/admin.service";
import {first} from "rxjs";
import {AlertService} from "../../services-and-shared/alert.service";

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.css']
})
export class PlayersComponent implements OnInit {

  userList?: User[]
  users!: User[]
  constructor(
    private authService: AuthService,
    private adminService: AdminService,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.authService.getAll().pipe(first()).subscribe(users => {
      this.users = users
      this.users = this.users.filter((user) => user.id !== 1)
    })
  }

  public disablePlayers(): void {
    for (let changeUser of this.userList!) {
      if (changeUser.id == 1) continue
      this.adminService.disablePlayer(changeUser.id!, changeUser)
        .pipe(first())
        // .subscribe(() => this.users = this.users.filter(x => x.id !== changeUser.id!));
    .subscribe({
      next: () => {
        this.alertService.success( `Статус игрока ${changeUser.username} изменен` );
        this.authService.getAll().pipe(first()).subscribe(users => {
          this.users = users
          this.users = this.users.filter((user) => user.id !== 1)
        })
      },
      error: error => {
        this.alertService.error(error);
        console.warn(error)
      }
    });
    }
    this.userList = undefined
  }

}
