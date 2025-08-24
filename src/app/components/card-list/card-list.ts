import { Component, signal, OnInit } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';

import { CardServices } from '../../services/card-services';
import { Product } from '../../models/card.model';

@Component({
  selector: 'app-card-list',
  standalone: true,
  imports: [
    NgFor,
    NgIf,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatToolbarModule,
    MatTooltipModule
  ],
  templateUrl: './card-list.html',
  styleUrls: ['./card-list.scss']
})
export class CardList implements OnInit {
  // products from API
  products: Product[] = [];

  // signal for UI
  cards = signal<Product[]>([]);

  constructor(private cardService: CardServices) { }

  ngOnInit(): void {
    this.cardService.getProducts().subscribe({
      next: (products) => {
        this.products = products;
        this.cards.set(products);

        this.cardService.saveToLocalStorage(products);
        console.log('Products loaded:', products);
      },
      error: (err) => {
        console.error('API Error:', err);

        const cached = this.cardService.loadFromLocalStorage();
        if (cached) {
          this.cards.set(cached);
          console.log('Loaded from local storage:', cached);
        }
      }
    });
  }




  addCard() {
    this.cards.update((cards) => [
      {
        id: '0',
        title: 'New Card',
        category: 'Custom',
        price: 0,
        thumbnail: '',
        images: [],
      },
      ...cards,
    ]);
  }

  editCard(card: Product) {
    console.log('Edit:', card);
  }

  deleteCard(card: Product) {
    this.cards.update((cards) => cards.filter((c) => c.id !== card.id));
  }
}
