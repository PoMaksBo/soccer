import { Component, OnInit } from '@angular/core';
import {User} from "../../_models/user.interface";
import {AuthService} from "../../services-and-shared/auth.service";
import {AdminService} from "../../services-and-shared/admin.service";
import {first} from "rxjs";

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
  ) {}

  ngOnInit(): void {
    this.authService.getAll().pipe(first()).subscribe(users => {
      this.users = users
      this.users = this.users.filter((x) => x.username !== 'admin')
    })
  }

  public deleteUsers(): void {
    for (let changeUser of this.userList!) {
      if (changeUser.id == 1) continue
      this.adminService.deleteUser(changeUser.id!)
        .pipe(first())
        .subscribe(() => this.users = this.users.filter(x => x.id !== changeUser.id!));
    }
    this.userList = undefined
  }

}
