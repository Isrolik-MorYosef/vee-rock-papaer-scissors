import {ChangeDetectionStrategy, ChangeDetectorRef, Component,} from '@angular/core';
import {GameOptionEnum} from "./types/game-option.enum";
import {AppService} from "./services/app.service";
import {Result} from "./types/result.interface";
import {Observable} from "rxjs";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {RulesDialogComponent} from "./components/rules-dialog/rules-dialog.component";
import {Animations} from "./animations/animations";
import {BreakpointObserver, Breakpoints, BreakpointState} from "@angular/cdk/layout";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [Animations.animeTrigger],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class AppComponent {
  userSelection: string;
  houseSelection: string;
  result: Result;
  completeGame: boolean = false;
  isExtraSmall: Observable<BreakpointState> = this.breakpointObserver.observe(Breakpoints.XSmall);

  constructor(public appService: AppService,
              public dialog: MatDialog,
              public changeDetectorRef: ChangeDetectorRef,
              public breakpointObserver: BreakpointObserver) {
  }

  openDialog(): void {
    let dialogRef: MatDialogRef<RulesDialogComponent> | null = null;
    if (dialogRef == null) {
      dialogRef = this.dialog.open(
        RulesDialogComponent,
        {
          disableClose: true,
          hasBackdrop: true,
          backdropClass: 'bg-drop'
        }
      );
    }
    dialogRef.afterClosed().subscribe(() => {
      dialogRef = null;
      smallDialogSubscription.unsubscribe();
    });

    const smallDialogSubscription = this.isExtraSmall.subscribe(result => {
      result.matches ?
        dialogRef?.addPanelClass('full-screen-modal') :
        dialogRef?.removePanelClass('full-screen-modal')
    });
  }

  public get gameEnum(): typeof GameOptionEnum {
    return GameOptionEnum;
  }

  async start(userSelection: string) {
    this.userSelection = userSelection;
    await this.sleep(800);
    this.houseSelection = this.getRandomValue();
    await this.sleep(800);
    this.calcResult();
    await this.sleep(800);
    this.completeGame = true;
    this.changeDetectorRef.detectChanges();
  }

  sleep(ms: number): Promise<any> {
    const promise: Promise<any> = new Promise(resolve => setTimeout(resolve, ms));
    this.changeDetectorRef.detectChanges();
    return promise
  }


  getRandomValue(): string {
    const rand = Math.floor(Math.random() * Object.keys(this.gameEnum).length);
    return Object.values(this.gameEnum)[rand];
  }

  calcResult(): void {
    this.result = this.appService.calculateResultGame(this.userSelection, this.houseSelection);
    if (this.result.isUserWinner !== undefined) {
      this.appService.updateScore(this.result.isUserWinner);
    }
  }

  playAgain(): void {
    this.houseSelection = '';
    this.userSelection = '';
    this.result = {textResult: ''};
    this.completeGame = false;
  }
}
