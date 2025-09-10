import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CardList } from './components/card-list/card-list';
import { Footer } from './components/footer/footer';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CardList, Footer, NgIf],
  templateUrl: './app.html',
  styleUrls: ['./app.scss']
})
export class App {
  protected readonly title = signal('cards-app');

  showLayout = true;

  constructor(private router: Router) {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        this.showLayout = event.url !== '/counter';
      });
  }
}
