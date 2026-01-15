import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { SalesComponent } from './pages/sales/sales.component';
import { MenuComponent } from './core/menu/menu.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },

  {
    path: '',
    component: MenuComponent,
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'sales', component: SalesComponent },
    ],
  },

  { path: '**', redirectTo: 'home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
