import {
  trigger,
  style,
  animate,
  transition,
  query,
  group
} from '@angular/animations';


export const animaciones =  
  trigger('routeAnimations', [
    transition('Login => Registro', slideTo('right')),
    transition('Registro => Login', slideTo('left')),
    transition('Login => Home', fade()),
    transition('Home => Login', fade())
  ]);


function fade() {
  return [
    query(':enter, :leave', [
      style({
        position: 'absolute',
        left: 0,
        width: '100%',
        opacity: 0,
        transform: 'scale(0) translateY(100%)'
      })
    ]),
    query(':enter', [
      animate('600ms ease',
        style({opacity: 1, transform: 'scale(1) translateY(0)'})
      )
    ]) 
  ];
}

function slideTo(direction) {
  const optional = {optional: true};
  return [
    query(':enter, :leave', [
      style({
        position: 'absolute',
        top: 0,
        [direction]: 0,
        width: '100%'
      })      
    ], optional),
    query(':enter', [
      style({[direction]: '-100%'})
    ]),
    group([
      query(':leave', [
        animate('600ms ease', style({
          [direction]: '100%'
        }))
      ], optional),
      query(':enter', [
        animate('600ms ease', style({[direction]: '0%'}))
      ])
    ])
  ];
}