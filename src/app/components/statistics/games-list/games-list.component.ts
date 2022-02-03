import { Component, OnInit } from '@angular/core';
import {Game} from "../../../_models/game";
import {GameService} from "../../../services-and-shared/game.service";
import {first} from "rxjs";
import {animate, state, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-games-list',
  templateUrl: './games-list.component.html',
  styleUrls: ['./games-list.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ])
  ]
})
export class GamesListComponent implements OnInit {

  games!: Game[]
  columnsToDisplay = ['id', 'alias', 'dt'];
  expandedElement!: Game | null;
  constructor(
    private gameService: GameService
  ) { }

  ngOnInit(): void {
    this.gameService.getAllGames().pipe(first()).subscribe(games => {
      this.games = games
    })
  }

}
