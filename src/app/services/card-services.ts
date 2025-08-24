import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Product } from '../models/card.model';

const API_URL =
  'https://api.freeapi.app/api/v1/public/randomproducts?page=1&limit=10&inc=category%252Cprice%252Cthumbnail%252Cimages%252Ctitle%252Cid&query=mens-watches';

const LOCAL_STORAGE_KEY = 'cardsApp:data:v1';

@Injectable({
  providedIn: 'root'
})
export class CardServices {
  constructor(private http: HttpClient) { }

  getProducts(): Observable<Product[]> {
    return this.http.get<{ data: { data: Product[] } }>(API_URL).pipe(
      map((res) => res.data?.data || [])
    );
  }

  saveToLocalStorage(data: Product[]): void {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));
  }

  loadFromLocalStorage(): Product[] | null {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
    return stored ? (JSON.parse(stored) as Product[]) : null;
  }
}
