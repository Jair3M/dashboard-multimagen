import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { environment } from 'src/enviroment/enviroment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  user: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {
    const isLogged = this.authService.isLoggedIn();
    if (isLogged) {
      this.router.navigate(['/home']);
    }
  }

  login() {
    const foundUser = environment.users.find(
      (u) => u.username === this.user && u.password === this.password
    );

    if (foundUser) {
      this.authService.login({
        username: foundUser.username,
        role: foundUser.role,
      });

      this.router.navigate(['/home']);
    } else {
      console.log('Credenciales inválidas');
      alert('Credenciales inválidas');
    }
  }
}
