import { Component, OnInit } from '@angular/core';
import {AppService} from "../../services/app.service";
import {Animations} from "../../animations/animations";

@Component({
  selector: 'app-score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.css'],
  animations: [Animations.fadeInOut]

})
export class ScoreComponent {
  constructor(private appService: AppService) { }

  getScore(): string {
    return this.appService.getScore();
  }
}
