import {
  ChangeDetectionStrategy, ChangeDetectorRef, Component,
} from '@angular/core';
import {GameOptionEnum} from "./types/game-option.enum";
import {AppService} from "./services/app.service";
import {Result} from "./types/result.interface";
import {BehaviorSubject, Observable} from "rxjs";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {RulesDialogComponent} from "./components/rules-dialog/rules-dialog.component";
import {style, animate, transition, trigger} from '@angular/animations';
import {Animations} from "./animations/animations";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    Animations.animeTrigger
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class AppComponent {
  // @ts-ignore
  userSelection: string;
  // @ts-ignore
  homeSelection: string;
  // @ts-ignore
  result: Result;
  // @ts-ignore
  dialogRef: MatDialogRef<RulesDialogComponent> | null;
  completeGame: boolean = false;

  constructor(public appService: AppService,
              public dialog: MatDialog,
              public cd: ChangeDetectorRef) {

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
    this.dialogRef.afterClosed().subscribe(() => {
      this.dialogRef = null;
    });
  }

  public get gameEnum(): typeof GameOptionEnum {
    return GameOptionEnum;
  }

  async start(userSelection: string) {
    this.userSelection = userSelection;
    await this.sleep(800);
    this.homeSelection = this.getRandomValue();
    await this.sleep(800);
    this.calcResult();
    await this.sleep(800);
    this.completeGame = true;
    this.cd.detectChanges();
  }

  getRandomValue(): string {
    const rand = Math.floor(Math.random() * Object.keys(this.gameEnum).length);
    return Object.values(this.gameEnum)[rand];
  }

  sleep(ms: number): Promise<any> {
    const promise: Promise<any> = new Promise(resolve => setTimeout(resolve, ms));
    this.cd.detectChanges();
    return promise
  }

  calcResult(): void {
    this.result = this.appService.calculateResultGame(this.userSelection, this.homeSelection);
    if (this.result.userWinner !== null) {
      this.appService.updateScore(this.result.userWinner);
    }
  }

  playAgain() {
    this.homeSelection = '';
    this.userSelection = '';
    this.result = {userWinner: null, textResult: ''};
    this.completeGame = false;
  }

}
