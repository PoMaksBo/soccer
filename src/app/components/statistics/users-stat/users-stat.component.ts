import { Component, OnInit } from '@angular/core';
import {User} from "../../../_models/user.interface";
import {AuthService} from "../../../services-and-shared/auth.service";
import {first} from "rxjs";

@Component({
  selector: 'app-users-stat',
  templateUrl: './users-stat.component.html',
  styleUrls: ['./users-stat.component.css']
})
export class UsersStatComponent implements OnInit {

  players!: User[]
  displayedColumns: string[] = ['id', 'username', 'first_name', 'last_name', 'player_rating']
  constructor(
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.authService.getAll().pipe(first()).subscribe(players => {
      this.players = players
      this.players = this.players.filter((user) => user.is_superuser !== true).sort((a:User, b:User) => b.player_rating - a.player_rating)
    })
  }

}
