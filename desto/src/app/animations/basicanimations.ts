// animations.ts
import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';

export const BasicAnimations = {
    fade: trigger('fade', [
      transition('* => *', [
        style({ opacity: '0' }),
        animate('0.5s')
      ]),
      transition(':leave', animate('300ms ease-out', style({ opacity: 0 })))
    ]),
    fadeSlow: trigger('fadeSlow', [
      state('invisible', style({
        opacity: 0,
      })),
      state('seen', style({
        opacity: 1,
      })),
      transition('invisible => seen', [
        animate('1.0s', keyframes([
          style({opacity: '0', offset: 0}),
          style({opacity: '0', offset: 0.2}),
          style({opacity: '1', offset: 1.0})
        ]))
      ]),
      transition('seen => invisible', [
        animate('0.5s')
      ])
    ]),
    fadeSlowOnEnter: trigger('fadeSlowOnEnter', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('1200ms', style({ opacity: 1 })),
      ]),
      transition(':leave', [
        animate('100ms', style({ opacity: 0 }))
      ])
    ]),
    flyInOnEnter1: trigger('flyInOnEnter1', [
      state('in', style({ transform: 'translateX(0)' })),
      transition(':enter', [
        style({ opacity: '0', transform: 'translateX(-2vw)' }),
        animate(600)
      ])
    ]),
    flyInOnEnter2: trigger('flyInOnEnter2', [
      state('in', style({ transform: 'translateX(0)' })),
      transition(':enter', [
        style({ opacity: '0', transform: 'translateX(-2vw)' }),
        animate(800)
      ])
    ]),
    flyInIfVisible: trigger('flyInIfVisible', [
      state('invisible', style({
        opacity: 0,
        transform: 'translateX(-100%)'
      })),
      state('seen', style({
        opacity: 1,
      })),
      transition('invisible => seen', [
        animate('1.5s')
      ]),
      transition('seen => invisible', [
        animate('0.5s')
      ])
    ])
};
