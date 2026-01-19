import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PurchaseOrder } from '../models/purchase-order.model';

@Injectable({ providedIn: 'root' })
export class SalesService {
  private readonly API_URL = 'https://api.multimagen.store/purchase-orders';

  constructor(private http: HttpClient) {}

  // GET (actual)
  getPurchaseOrders(): Observable<PurchaseOrder[]> {
    return this.http.get<PurchaseOrder[]>(this.API_URL);
  }

  // POST (futuro)
  getPurchaseOrdersByDateRange(
    from: Date,
    to: Date
  ): Observable<PurchaseOrder[]> {
    return this.http.post<PurchaseOrder[]>(this.API_URL, {
      from,
      to,
    });
  }
}
