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
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {RulesDialogComponent} from "./components/rules-dialog/rules-dialog.component";

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
  stepsOfGame$: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  // @ts-ignore
  dialogRef: MatDialogRef<RulesDialogComponent> | null;

  constructor(private dataService: DataService,
              public dialog: MatDialog) {

  }

  openDialog() {
    if (this.dialogRef == null) {
      this.dialogRef = this.dialog.open(
        RulesDialogComponent,
        {
          disableClose: true,
          hasBackdrop: true,
          backdropClass: 'bdrop'
        }
      );
    }
    this.dialogRef.afterClosed().subscribe(result => {
      this.dialogRef = null;
    });
  }

  public get gameEnum(): typeof GameOptionEnum {
    return GameOptionEnum;
  }

  setSelectedUser(option: string) {
    this.userSelected = option;
    this.getRandomValue();
    this.result = this.dataService.calculateResultGame(this.userSelected, this.homeSelected);
    if (this.result.userWinner !== null) {
      this.dataService.updateScore(this.result.userWinner);
    }
  }

  getRandomValue(): any {
    this.stepsOfGame$.next(1);
    var rand = Math.floor(Math.random() * Object.keys(this.gameEnum).length);
    this.homeSelected = Object.values(this.gameEnum)[rand];
  }

  playAgain() {
    this.homeSelected = null;
    this.userSelected = null;
  }
}
