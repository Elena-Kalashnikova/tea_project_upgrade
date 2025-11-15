import { Injectable } from '@angular/core';
import {CardsType} from "../../types/cardsType";
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CardService {
  constructor(private http: HttpClient) { }
  getCards(): Observable<CardsType[]> {
    return this.http.get<CardsType[]>('https://testologia.ru/tea');
  }

  getCard(id:number):Observable<CardsType> {
    return this.http.get<CardsType[]>('https://testologia.ru/tea').
      pipe(
        map(resultCard =>{
          const card = resultCard.find(cardItem => cardItem.id === id);
          if(!card) {
            throw new Error('Card not found');
          }
          return card;
        })
    )
  }

  getSearch(search: string): Observable<CardsType[]> {
    return this.http.get<CardsType[]>(`https://testologia.ru/tea?search=${search}`);
  }
}
