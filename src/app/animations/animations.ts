import {trigger, state, style, transition, animate, keyframes} from '@angular/animations';

export const Animations = {
  animeTrigger: trigger('animeTrigger', [
    state('in', style({transform: 'translateY(0)'})),
    transition('void => *', [
      animate(700, keyframes([
        style({opacity: 0, transform: 'translateY(-100%)', offset: 0}),
        style({opacity: 1, transform: 'translateY(25px)',  offset: 0.3}),
        style({opacity: 1, transform: 'translateY(0)',     offset: 1.0})
      ]))
    ])
  ]),
  fadeInOut: [
    trigger('fadeInOut', [
      transition(':enter', [   // :enter is alias to 'void => *'
        style({opacity: 0}),
        animate(500, style({opacity: 1}))
      ]),
      transition(':leave', [   // :leave is alias to '* => void'
        animate(500, style({opacity: 0}))
      ])
    ])
  ]
}
