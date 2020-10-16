import { NgModule } from '@angular/core';
import { Routes, RouterModule, CanActivate } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegistroComponent } from './components/registro/registro.component';
import { ErrorComponent } from './components/error/error.component';
import { AdminComponent } from './components/admin/admin.component';
import { PacienteComponent } from './components/paciente/paciente.component';
import { ProfesionalComponent } from './components/profesional/profesional.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { CheckPerfilGuard } from './guards/check-perfil.guard';
import { CheckLoginGuard } from './guards/check-login.guard';
import { CheckAdminGuard } from './guards/check-admin.guard';
import { CheckPacienteGuard } from './guards/check-paciente.guard';
import { CheckProfesionalGuard } from './guards/check-profesional.guard';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'iniciarSesion',
    component: LoginComponent
  },
  {
    path: 'registrarse',
    component: RegistroComponent
  },
  {
    path: 'inicio',
    component: InicioComponent,
    canActivate: [CheckLoginGuard],
    children: [
      {
        path: '',
        canActivate: [CheckPerfilGuard],
        component: InicioComponent
      },
      {
        path: 'admin',
        component: AdminComponent,
        canActivate: [CheckAdminGuard]
      },
      {
        path: 'paciente',
        component: PacienteComponent,
        canActivate: [CheckPacienteGuard]
      },
      {
        path: 'profesional',
        component: ProfesionalComponent,
        canActivate: [CheckProfesionalGuard]
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
