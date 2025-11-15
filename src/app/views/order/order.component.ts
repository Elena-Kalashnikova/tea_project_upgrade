import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Subject, Subscription} from "rxjs";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {OrderService} from "../../shared/services/order.service";

@Component({
  selector: 'order-component',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit, OnDestroy {
  private subscription: Subscription | null = null;
  private subscriptionOrder: Subscription | null = null;
  private subscriptionBtn: Subscription | null = null;
  success: boolean = false;
  errorOrder: boolean = false;
  btnRequest: boolean = true;
  checkoutForm: FormGroup;
  private subject: Subject<boolean>;


  constructor(private activateRoute: ActivatedRoute, private fb: FormBuilder, private orderService: OrderService) {
    this.subject = new Subject<boolean>();
    this.checkoutForm = this.fb.group({
      name: ['', [Validators.required, Validators.pattern('^[а-яА-я]+$')]],
      lastName: ['', [Validators.required, Validators.pattern('^[а-яА-я]+$')]],
      phone: ['', [Validators.required, Validators.pattern(/^\+?[0-9]{11}$/)]],
      address: ['', [Validators.required, Validators.pattern(/^[а-яА-Я0-9\\s\-\/]+$/)]],
      product: '',
      country: ['', [Validators.required]],
      zip: ['', [Validators.required]],
      comment: ['']
    });
  }


  ngOnInit(): void {
    this.subscription = this.activateRoute.queryParams.subscribe((params) => {
      if (params['product']) {
        this.checkoutForm.patchValue({product: params['product']});
      }
    });
    this.subscriptionBtn = this.subject.subscribe({
      next: (param: boolean) => {
        this.errorOrder = param;
      }
    });
  }

  order(): void {
    this.subscriptionOrder = this.orderService.orderPost({
      name: this.checkoutForm.get('name')?.value,
      last_name: this.checkoutForm.get('lastName')?.value,
      phone: this.checkoutForm.get('phone')?.value,
      country: this.checkoutForm.get('country')?.value,
      zip: this.checkoutForm.get('zip')?.value,
      product: this.checkoutForm.get('product')?.value,
      address: this.checkoutForm.get('address')?.value,
      comment: this.checkoutForm.get('comment')?.value,
    }).subscribe(response => {
      this.btnRequest = false;
      if (response.success === 1 && !response.message) {
        this.success = true;
        this.errorOrder = false;
      } else {
        this.success = false;
        this.errorOrder = true;
        this.subject.next(true);
      }
      setTimeout(() => {
        this.subject.next(false);
      }, 3000);
    })

  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
    this.subscriptionOrder?.unsubscribe();
    this.subscriptionBtn?.unsubscribe();
  }


}
