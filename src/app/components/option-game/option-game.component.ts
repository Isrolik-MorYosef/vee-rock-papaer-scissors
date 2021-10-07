import {Component, Input, OnInit} from '@angular/core';
import {GameOptionEnum} from "../../types/game-option.enum";

@Component({
  selector: 'app-option-game',
  templateUrl: './option-game.component.html',
  styleUrls: ['./option-game.component.css']
})
export class OptionGameComponent {
  @Input() type: any;

  public get gameEnum(): typeof GameOptionEnum {
    return GameOptionEnum;
  }
}
