import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CardList } from './components/card-list/card-list';
import { Footer } from './components/footer/footer';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CardList, Footer],
  templateUrl: './app.html',
  styleUrls: ['./app.scss']
})
export class App {
  protected readonly title = signal('cards-app');
}
