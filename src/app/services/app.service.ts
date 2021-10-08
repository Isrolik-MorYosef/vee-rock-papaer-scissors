import {Injectable} from '@angular/core';
import {GameOptionEnum} from "../types/game-option.enum";
import {Result} from "../types/result.interface";

@Injectable({
  providedIn: 'root'
})
export class AppService {
  score: number = 0;

  calculateResultGame(userSelection: any, homeSelection: any): Result {
    let result: Result = {textResult: '', userWinner: null};
    if (userSelection === homeSelection) {
      result.textResult = 'TIE';
    } else if (userSelection === GameOptionEnum.PAPER) {
      if (homeSelection === GameOptionEnum.SCISSORS) {
        result.textResult = 'YOU LOSE';
      } else {
        result.textResult = 'YOU WIN'
      }
    } else if (userSelection === GameOptionEnum.ROCK) {
      if (homeSelection === GameOptionEnum.PAPER) {
        result.textResult = 'YOU LOSE';
      } else {
        result.textResult = 'YOU WIN'
      }
    } else if (userSelection === GameOptionEnum.SCISSORS) {
      if (homeSelection === GameOptionEnum.ROCK) {
        result.textResult = 'YOU LOSE';
      } else {
        result.textResult = 'YOU WIN'
      }
    }
    result.userWinner = result.textResult === 'TIE' ? null : result.textResult === 'YOU WIN'
    return result;
  }

  getScore(): string {
    if (sessionStorage.getItem('SCORE') === null) {
      sessionStorage.setItem('SCORE', '0')
    }
    return <string>sessionStorage.getItem('SCORE');
  }

  updateScore(win: boolean): void {
    let score: number = Number(sessionStorage.getItem('SCORE'));
    sessionStorage.setItem('SCORE', String(win ? score += 1 : score -= 1));
  }
}
