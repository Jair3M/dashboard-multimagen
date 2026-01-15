import { Component } from '@angular/core';

export interface User {
  id: number;
  name: string;
  email: string;
}

const DATA: User[] = [
  { id: 1, name: 'Juan', email: 'juan@mail.com' },
  { id: 2, name: 'Ana', email: 'ana@mail.com' },
];

@Component({
  selector: 'app-table',
  templateUrl: './sales.component.html',
})
export class SalesComponent {
  displayedColumns = ['id', 'name', 'email'];
  dataSource = DATA;
}
