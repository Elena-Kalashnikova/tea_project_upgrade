import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subject, Subscription} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'header-component',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  inputValue: string = '';
  subject: Subject<string>;
  private subscription: Subscription | null = null;

  constructor(private router: Router) {
    this.subject = new Subject<string>();
  }

  ngOnInit(): void {
   this.subscription = this.subject.subscribe({
      next: (value) => {
        this.inputValue = value;
      }
    })
  }
  onSearch() {
    this.subject.next(this.inputValue);
  }

  clearInput() {
    this.subject.next('');
    this.router.navigate([], {
      queryParams: {},
    });
  }
  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }

}
