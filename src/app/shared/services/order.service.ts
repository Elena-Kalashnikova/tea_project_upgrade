import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {FormValues} from "../../types/formValues";

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) {
  }

  orderPost(data: FormValues): Observable<any> {
    return this.http.post<{ success: number, message?: string }>(`https://testologia.ru/order-tea`, data);
  }
}
