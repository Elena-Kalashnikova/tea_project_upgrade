import {Component, OnDestroy, OnInit} from '@angular/core';
import {CardsType} from "../../../types/cardsType";
import {map, Subscription, switchMap, tap} from "rxjs";
import {CardService} from "../../../shared/services/card.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'catalog-component',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss']
})
export class CatalogComponent implements OnInit, OnDestroy {
  cards: CardsType[] = [];
  private subscription: Subscription | null = null;
  loader: boolean = false;
  header: string = 'Наши чайные коллекции';

  constructor(private cardService: CardService, private router: Router, private activateRouter: ActivatedRoute) {
  }

  ngOnInit() {
    this.subscription = this.activateRouter.queryParams.pipe(tap(() => {
        this.loader = true;
      }),
      switchMap((params) => {
        const search = params['search'];
        if (params['search']) {
          return this.cardService.getSearch(search).pipe(
            tap(() => (this.loader = false)),
            map(data => ({data, search}))
          );
        } else {
          return this.cardService.getCards().pipe(
            tap(() => (this.loader = false)),
             map(data => ({data, search: ''}))
          );
        }
      })
    ).subscribe({
      next:({data, search}) => {
        this.cards = data
        if(search && this.cards.length !==0) {
          this.header ='Результаты поиска по запросу (' + search + ')';
        } else if(this.cards.length === 0) {
          this.header = 'Ничего не найдено';
        } else {
          this.header = 'Наши чайные коллекции';
        }
      },
      error: () => {
        this.router.navigate(['/']);
      }
    });
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }

}
