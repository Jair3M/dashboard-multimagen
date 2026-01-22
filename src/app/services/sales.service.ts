import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PurchaseOrder } from '../models/purchase-order.model';
import { environment } from 'src/enviroment/enviroment';

@Injectable({ providedIn: 'root' })
export class SalesService {
  private readonly API_URL = `${environment.apiUrl}`;

  constructor(private http: HttpClient) {}

  // GET (actual)
  getPurchaseOrders(): Observable<PurchaseOrder[]> {
    return this.http.get<PurchaseOrder[]>(this.API_URL);
  }

  // POST (futuro)
  getPurchaseOrdersByDateRange(payload: any): Observable<PurchaseOrder[]> {
    return this.http.post<PurchaseOrder[]>(
      `${this.API_URL}/purchase-orders/searching`,
      payload
    );
  }
}
