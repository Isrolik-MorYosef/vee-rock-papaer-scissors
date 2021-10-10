import {Component} from '@angular/core';
import {AppService} from "../../services/app.service";

@Component({
  selector: 'app-score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.css']
})

export class ScoreComponent {
  constructor(private appService: AppService) { }

  getScore(): string {
    return this.appService.getScore();
  }
}
