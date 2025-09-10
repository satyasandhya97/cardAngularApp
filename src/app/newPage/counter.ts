import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-counter',
  imports: [],
  templateUrl: './counter.html',
  styleUrl: './counter.scss'
})
export class Counter implements OnInit, OnDestroy {
  count = 0;
  resetInterval: any;

  ngOnInit(): void {
    this.resetInterval = setInterval(() => {
      this.count = 0;
    }, 1000);
  }

  increment() {
    this.count++;
  }
  decrement() {
    this.count--;
  }
  reset() {
    this.count = 0;
  }
  ngOnDestroy(): void {

  }
}
