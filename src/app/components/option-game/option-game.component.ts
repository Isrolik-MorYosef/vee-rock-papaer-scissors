import {Component, Input} from '@angular/core';
import {GameOptionEnum} from "../../types/game-option.enum";
import {Animations} from "../../animations/animations";

@Component({
  selector: 'app-option-game',
  templateUrl: './option-game.component.html',
  styleUrls: ['./option-game.component.css'],
  animations: [Animations.fadeInOut]
})
export class OptionGameComponent {
  @Input() type: any;
  @Input() win?: boolean | null;

  public get gameEnum(): typeof GameOptionEnum {
    return GameOptionEnum;
  }
}
