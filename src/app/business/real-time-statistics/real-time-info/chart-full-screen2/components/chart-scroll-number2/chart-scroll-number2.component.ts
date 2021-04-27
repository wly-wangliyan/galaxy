import {Component, Input, OnInit} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {Observable} from 'rxjs/Observable';

const totalAnimateMilliseconds = 1000;

@Component({
  selector: 'app-chart-scroll-number2',
  templateUrl: './chart-scroll-number2.component.html',
  styleUrls: ['./chart-scroll-number2.component.css'],
  animations: [
    trigger('moveAnimation', [
      state('one', style({transform: 'translateY(-50px)', opacity: 0})),
      state('two', style({transform: 'translateY(-50px)', opacity: 0})),
      state('three', style({transform: 'translateY(-50px)', opacity: 0})),
      state('four', style({transform: 'translateY(-50px)', opacity: 0})),
      state('five', style({transform: 'translateY(-50px)', opacity: 0})),
      state('six', style({transform: 'translateY(-50px)', opacity: 0})),
      state('seven', style({transform: 'translateY(-50px)', opacity: 0})),
      state('eight', style({transform: 'translateY(-50px)', opacity: 0})),
      state('nine', style({transform: 'translateY(-50px)', opacity: 0})),
      state('none', style({transform: 'translateY(0)', opacity: 1})),
      transition('none => nine', [
        animate(totalAnimateMilliseconds / 9),
      ]),
      transition('none => eight', [
        animate(totalAnimateMilliseconds / 8),
      ]),
      transition('none => seven', [
        animate(totalAnimateMilliseconds / 7),
      ]),
      transition('none => six', [
        animate(totalAnimateMilliseconds / 6),
      ]),
      transition('none => five', [
        animate(totalAnimateMilliseconds / 5),
      ]),
      transition('none => four', [
        animate(totalAnimateMilliseconds / 4),
      ]),
      transition('none => three', [
        animate(totalAnimateMilliseconds / 3),
      ]),
      transition('none => two', [
        animate(totalAnimateMilliseconds / 2),
      ]),
      transition('none => one', [
        animate(totalAnimateMilliseconds / 1),
      ]),
      transition('* => none', [
        style({transform: 'translateY(0)'}),
      ])
    ]),
  ]
})
export class ChartScrollNumber2Component {

  private numberArray = ['none', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];

  public moveState = 'none';

  public targetState = 'none';

  public currentNumber = 0;

  private _targetNumber = 0;
  @Input()
  public set targetNumber(target: number) {
    this._targetNumber = Math.floor(Number(target));
    Observable.timer(0).subscribe(() => {
      this.calcAnimateTime();
      this.onAnimationDone(null);
    });
  }

  public get targetNumber(): number {
    return this._targetNumber;
  }

  @Input() public size: 'lg' | 'sm' = 'sm';

  public onAnimationDone(event: any) {
    if (!event || event.fromState === 'none') {
      Observable.timer(0).subscribe(() => {
        this.moveState = this.moveState === this.targetState ? 'none' : this.targetState;
      });
    } else if (event && event.toState === 'none') {
      if (this.currentNumber !== this.targetNumber) {
        this.currentNumber++;
        this.currentNumber = this.currentNumber >= 10 ? this.currentNumber - 10 : this.currentNumber;
        if (this.currentNumber !== this.targetNumber) {
          this.moveState = this.targetState;
        }
      }
    }
  }

  private calcAnimateTime() {
    let intervalNumber = 0;
    if (this.targetNumber > this.currentNumber) {
      intervalNumber = this.targetNumber - this.currentNumber;
    } else if (this.targetNumber < this.currentNumber) {
      intervalNumber = (10 - this.currentNumber + this.targetNumber);
    }
    this.targetState = this.numberArray[intervalNumber];
  }
}
