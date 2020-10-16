import { Route } from '@angular/compiler/src/core';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class CheckPerfilGuard implements CanActivate {

  constructor(private authSvc: AuthService, private router: Router, private route: ActivatedRoute) { }

  canActivate(): Observable<boolean>{
    return this.authSvc.user$.pipe(map(user => {
      if(!user)
        return false;

      switch(user.perfil) {
        case 'administrador':
          this.router.navigate(['inicio/admin']);
        break;

        case 'profesional':
          this.router.navigate(['inicio/profesional']);
        break;

        case 'paciente':
          this.router.navigate(['inicio/paciente']);
        break;
      }

      return true;
    }));
  }
  
}
