import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class PerfilGuard implements CanActivate {

  constructor(
    private authSvc: AuthService,
    private router: Router,
    private db: AngularFirestore
  ) { }

  canActivate(): Observable<boolean>{
    return this.authSvc.user$.pipe(map(user => {

      if (!user) {
        return false;
      }

      switch (user.perfil) {
        case 'administrador':
          this.router.navigate(['perfil/admin']);
          break;

        case 'profesional':
          this.db.collection('loginProfesionales').add({fechaYHora: new Date()});
          this.router.navigate(['perfil/profesional']);
          break;

        case 'paciente':
          this.router.navigate(['perfil/paciente']);
          break;
      }

      return true;
    }));
  }

}
