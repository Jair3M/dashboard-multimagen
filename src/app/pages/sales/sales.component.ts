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
    'PurchasedDate',
    'Seller',
    'Code',
    'TourName',
    'Amount',
    'PaymentType',
    'Currency',
    'Phone',
    'Email',
  ];

  dataSource = new MatTableDataSource<PurchaseOrder>([]);

  fromDate: Date = new Date();
  toDate: Date = new Date();
  user: string = '';
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
    const payload: any = {
      CreatedFrom: this.fromDate,
      CreatedTo: this.toDate,
    };

    if (this.user?.trim()) {
      payload.Code = this.user;
    }
    this.salesService.getPurchaseOrdersByDateRange(payload).subscribe({
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
    const payload: any = {
      CreatedFrom: this.fromDate,
      CreatedTo: this.toDate,
    };

    if (this.user?.trim()) {
      payload.Code = this.user;
    }

    this.salesService.getPurchaseOrdersByDateRange(payload).subscribe({
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
      Fecha: new Date(po.PurchasedDate).toISOString().split('T')[0],
      Vendedor: po.Seller,
      Usuario: po.Family?.Photographers?.Code,
      Concesión: po.Family?.Tours?.Name,
      Monto: po.Amount,
      Pago: po.PaymentType,
      Moneda: po.Currency,
      Teléfono: po.Family?.Phone,
      CorreoEletronico: po.Family?.Email,
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
    saveAs(blob, 'Ventas.xlsx');
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

  formatDate(date: Date | null): string {
    if (!date) return '';
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
  }
}
