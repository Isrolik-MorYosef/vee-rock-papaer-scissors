import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  Pipe,
  PipeTransform
} from '@angular/core';
import {GameOptionEnum} from "./types/game-option.enum";
import {DataService} from "./services/data.service";
import {Result} from "./types/result.interface";
import {BehaviorSubject, Observable, Subject} from "rxjs";
import {debounceTime, take} from "rxjs/operators";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  // @ts-ignore
  userSelected: any = null;
  homeSelected: any = null;
  // @ts-ignore
  result: Result;
  // @ts-ignore
  ready$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private dataService: DataService) {
  }

  public get gameEnum(): typeof GameOptionEnum {
    return GameOptionEnum;
  }

  setSelectedUser(option: string) {
    this.userSelected = option;
    this.getRandomValue();
    this.result = this.dataService.calculateResultGame(this.userSelected, this.homeSelected);
    if(this.result.userWinner !== null) {
      this.dataService.updateScore(this.result.userWinner);
    }
  }

  getRandomValue(): any {
    this.ready$.next(true);
    var rand = Math.floor(Math.random() * Object.keys(this.gameEnum).length);
    this.homeSelected = Object.values(this.gameEnum)[rand];
  }

  playAgain() {
    this.homeSelected = null;
    this.userSelected = null;
  }
}
