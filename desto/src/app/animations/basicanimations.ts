// animations.ts
import { trigger, state, style, transition, animate } from '@angular/animations';

export const BasicAnimations = {
    fade: trigger('fade', [
      transition('* => *', [
        style({ opacity: '0' }),
        animate('0.5s')
      ]),
      transition(':leave', animate('300ms ease-out', style({ opacity: 0 })))
    ]),
    fadeSlow: trigger('fadeSlow', [
      transition('* => *', [
        style({ opacity: '0' }),
        animate('2.0s')
      ]),
      transition(':leave', animate('300ms ease-out', style({ opacity: 0 })))
    ]),
    flyIn1: trigger('flyIn1', [
      state('in', style({ transform: 'translateX(0)' })),
      transition(':enter', [
        style({ opacity: '0', transform: 'translateX(-2vw)' }),
        animate(600)
      ])
    ]),
    flyIn2: trigger('flyIn2', [
      state('in', style({ transform: 'translateX(0)' })),
      transition(':enter', [
        style({ opacity: '0', transform: 'translateX(-2vw)' }),
        animate(800)
      ])
    ])
}
