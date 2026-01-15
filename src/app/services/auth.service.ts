import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {
  logout(): void {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  constructor(private router: Router) {}
}
