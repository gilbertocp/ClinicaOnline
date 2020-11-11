import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegistroComponent } from './components/registro/registro.component';
import { ErrorComponent } from './components/error/error.component';
import { AdminComponent } from './components/admin/admin.component';
import { PacienteComponent } from './components/paciente/paciente.component';
import { ProfesionalComponent } from './components/profesional/profesional.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { CheckLoginGuard } from './guards/check-login.guard';
import { PerfilGuard } from './guards/perfil.guard';
import { AdminGuard } from './guards/admin.guard';
import { PacienteGuard } from './guards/paciente.guard';
import { ProfesionalGuard } from './guards/profesional.guard';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
  },
  {
    path: 'iniciarSesion',
    component: LoginComponent,
    data: {animation: 'Login'}
  },
  {
    path: 'registrarse',
    component: RegistroComponent,
    data: {animation: 'Registro'}
  },
  {
    path: 'perfil',
    component: InicioComponent,
    canActivate: [CheckLoginGuard],
    data: {animation: 'Home'},
    children: [
      {
        path: '',
        component: InicioComponent,
        canActivate: [PerfilGuard]
      },
      {
        path: 'admin',
        component: AdminComponent,
        canActivate: [AdminGuard]
      },
      {
        path: 'paciente',
        component: PacienteComponent,
        canActivate: [PacienteGuard],
      },
      {
        path: 'profesional',
        component: ProfesionalComponent,
        canActivate: [ProfesionalGuard]
      }
    ]
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
