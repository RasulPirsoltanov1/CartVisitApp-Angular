import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Card } from '../modules/card';

@Injectable({
  providedIn: 'root'
})
export class CardService {

  cards!: Card[]
  constructor(private http: HttpClient, @Inject('apiUrl') private apiUrl: string) { }
  getCards(): any {
    this.http.get<Card[]>(this.apiUrl + "cards").subscribe(res => this.cards = res);
  }
  addCard(card: Card) {
    return this.http.post(this.apiUrl + 'cards', card);
  }
  updateCard(card: Card, cardId: number) {
     return this.http.put<Card[]>(this.apiUrl + 'cards/' + cardId, card);
  }
  deleteCard(cardId:number){
    return this.http.delete(this.apiUrl + 'cards/'+cardId);
  }
}
