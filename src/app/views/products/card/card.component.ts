import {Component, OnDestroy, OnInit} from '@angular/core';
import {CardsType} from "../../../types/cardsType";
import {ActivatedRoute, Router} from "@angular/router";
import {CardService} from "../../../shared/services/card.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'card-component',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit, OnDestroy {
  card: CardsType;
  private subscription: Subscription | null = null;

  constructor(private cardService: CardService, private activateRoute: ActivatedRoute, private router: Router) {
    this.card = {
      id: 0,
      image: '',
      title: '',
      price: 0,
      description: ''
    }
  }

  ngOnInit(): void {
    this.activateRoute.params.subscribe((params) => {
      if (params['id']) {
        this.cardService.getCard(+params['id']).subscribe({
          next:(data) =>{
            this.card = data;
          },
          error:(error) => {
            this.router.navigate(['/']);
          }
        });
      }
    })
  }
  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }

}
