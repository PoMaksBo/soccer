import {Component, Input, OnInit} from '@angular/core';
import {GameService} from "../../../services-and-shared/game.service";

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {


  constructor(
    private gameService: GameService
  ) { }

  ngOnInit(): void {
  }

  public saveResult(): void {}
}
