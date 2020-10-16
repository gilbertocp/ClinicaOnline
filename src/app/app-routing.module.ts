import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegistroComponent } from './components/registro/registro.component';
import { ErrorComponent } from './components/error/error.component';

const routes: Routes = [
  {
    path: 'iniciarSesion',
    component: LoginComponent
  },
  {
    path: 'registrarse',
    component: RegistroComponent
  },
  {
    path: '',
    component: LoginComponent
  },
  {
    path: '**',
    component: ErrorComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
