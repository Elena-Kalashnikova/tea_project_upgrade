import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {Observable, Subscription} from "rxjs";
import {SlideConfigType} from "../../types/slideConfig.type";
import { NgbModal} from "@ng-bootstrap/ng-bootstrap";


@Component({
  selector: 'main-component',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, AfterViewInit, OnDestroy {
  private observableModal: Observable<string>;
  private subscription: Subscription | null = null;
  @ViewChild('popup')
  popup!: TemplateRef<ElementRef>;

  private popupTemp!: TemplateRef<ElementRef>;


  slideConfig: SlideConfigType = {
    slidesToShow: 1,
    slidesToScroll: 1,
    dots: true,
    infinite: false
  };
  slides = [
    {
      image: 'assets/images/tea1.png'
    },
    {
      image: 'assets/images/tea2.png'
    },
    {
      image: 'assets/images/tea3.png'
    }
  ]

  constructor(private modalService: NgbModal) {
    this.observableModal = new Observable((observer) => {
      setTimeout(() => {
        observer.next('open');
      }, 10000);
    });
  }

  ngAfterViewInit() {
    this.popupTemp = this.popup;
  }

  ngOnInit(): void {
    this.subscription = this.observableModal.subscribe(param => {
      if (param === 'open') {
        this.openModal();
      }
    });
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }

  openModal() {
    this.modalService.open(this.popupTemp).result.then(
      (result) => {
        console.log('Closed with:', result);
      },
      (reason) => {
        console.log('Dismissed', reason);
      }
    );
  }

}
