import {
  Component,
  OnInit,
  ViewChild,
  AfterViewInit,
  ViewEncapsulation,
} from '@angular/core';
import { SalesService } from '../../services/sales.service';
import { PurchaseOrder } from '../../models/purchase-order.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  encapsulation: ViewEncapsulation.None, // DESACTIVAR ENCAPSULACIÓN
})
export class SalesComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = [
    'Seller',
    'PurchasedDate',
    'Amount',
    'PaymentType',
    'Currency',
    'IsNotificated',
  ];

  dataSource = new MatTableDataSource<PurchaseOrder>([]);

  fromDate!: Date;
  toDate!: Date;
  isLoading = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private salesService: SalesService) {}

  ngOnInit(): void {
    this.loadSales();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  loadSales(): void {
    this.isLoading = true;
    this.salesService.getPurchaseOrders().subscribe({
      next: (data) => {
        this.updateTable(data);
        this.isLoading = false;
      },
      error: (err) => {
        console.error(err);
        this.isLoading = false;
      },
    });
  }

  filterByDate(): void {
    if (!this.fromDate || !this.toDate) return;

    this.isLoading = true;
    this.salesService
      .getPurchaseOrdersByDateRange(this.fromDate, this.toDate)
      .subscribe({
        next: (data) => {
          this.updateTable(data);
          this.isLoading = false;
        },
        error: (err) => {
          console.error(err);
          this.isLoading = false;
        },
      });
  }

  exportToExcel(): void {
    if (!this.dataSource.data || this.dataSource.data.length === 0) return;

    // Convertimos los datos a una tabla simple
    const exportData = this.dataSource.data.map((po) => ({
      ID: po.IdPurchaseOrder,
      Fecha: po.PurchasedDate,
      Monto: po.Amount,
      Pago: po.PaymentType,
      Moneda: po.Currency,
      Vendedor: po.Seller,
    }));

    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(exportData);
    const workbook: XLSX.WorkBook = {
      Sheets: { PurchaseOrders: worksheet },
      SheetNames: ['PurchaseOrders'],
    };

    const excelBuffer: any = XLSX.write(workbook, {
      bookType: 'xlsx',
      type: 'array',
    });
    const blob: Blob = new Blob([excelBuffer], {
      type: 'application/octet-stream',
    });
    saveAs(blob, 'PurchaseOrders.xlsx');
  }

  private updateTable(data: PurchaseOrder[]): void {
    this.dataSource.data = data;

    this.dataSource.sortingDataAccessor = (item, property) => {
      switch (property) {
        case 'PurchasedDate':
          return new Date(item.PurchasedDate);
        default:
          return (item as any)[property];
      }
    };
  }
}
