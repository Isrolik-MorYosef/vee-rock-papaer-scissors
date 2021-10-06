import {Injectable} from '@angular/core';
import {GameOptionEnum} from "../types/game-option.enum";
import {Result} from "../types/result.interface";

@Injectable({
  providedIn: 'root'
})
export class DataService {
  score: number = 0;

  constructor() {
  }

  calculateResultGame(userSelected: any, homeSelected: any): Result {
    let result: Result = {textResult: '', userWinner: null};
    if (userSelected === homeSelected) {
      result.textResult = 'TIE';
    } else if (userSelected === GameOptionEnum.PAPER) {
      if (homeSelected === GameOptionEnum.SCISSORS) {
        result.textResult = 'YOU LOSE';
      } else {
        result.textResult = 'YOU WIN'
      }
    } else if (userSelected === GameOptionEnum.ROCK) {
      if (homeSelected === GameOptionEnum.PAPER) {
        result.textResult = 'YOU LOSE';
      } else {
        result.textResult = 'YOU WIN'
      }
    } else if (userSelected === GameOptionEnum.SCISSORS) {
      if (homeSelected === GameOptionEnum.ROCK) {
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
