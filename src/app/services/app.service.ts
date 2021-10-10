import {Injectable} from '@angular/core';
import {GameOptionEnum} from "../types/game-option.enum";
import {Result} from "../types/result.interface";

@Injectable({
  providedIn: 'root'
})
export class AppService {
  score: number;

  calculateResultGame(userSelection: string, houseSelection: string): Result {
    let result: Result = {textResult: ''};
    if (userSelection === houseSelection) {
      result.textResult = 'TIE';
      result.isTie = true;
    } else if (userSelection === GameOptionEnum.PAPER) {
      if (houseSelection === GameOptionEnum.SCISSORS) {
        result.textResult = 'YOU LOSE';
      } else {
        result.textResult = 'YOU WIN';
      }
    } else if (userSelection === GameOptionEnum.ROCK) {
      if (houseSelection === GameOptionEnum.PAPER) {
        result.textResult = 'YOU LOSE';
      } else {
        result.textResult = 'YOU WIN';
      }
    } else if (userSelection === GameOptionEnum.SCISSORS) {
      if (houseSelection === GameOptionEnum.ROCK) {
        result.textResult = 'YOU LOSE';
      } else {
        result.textResult = 'YOU WIN';
      }
    }
    if(!result.isTie) {
      result.isUserWinner = result.textResult === 'YOU WIN';
    }
    return result;
  }

  getScore(): string {
    if (sessionStorage.getItem('SCORE') === null) {
      sessionStorage.setItem('SCORE', '0')
    }
    return String(sessionStorage.getItem('SCORE'));
  }

  updateScore(win: boolean): void {
    let score: number = Number(sessionStorage.getItem('SCORE'));
    sessionStorage.setItem('SCORE', String(win ? score += 1 : score -= 1));
  }
}
