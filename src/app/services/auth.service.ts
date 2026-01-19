import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/enviroment/enviroment';

export interface LoggedUser {
  username: string;
  role: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly STORAGE_KEY = 'loggedUser';

  constructor(private router: Router) {}

  /*logout(): void {
    localStorage.clear();
    this.router.navigate(['/login']);
  }*/

  login(user: LoggedUser) {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(user));
  }

  logout() {
    localStorage.removeItem(this.STORAGE_KEY);
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem(this.STORAGE_KEY);
  }

  getUser(): LoggedUser | null {
    const data = localStorage.getItem(this.STORAGE_KEY);
    return data ? JSON.parse(data) : null;
  }
}
