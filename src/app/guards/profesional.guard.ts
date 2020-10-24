import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ProfesionalGuard implements CanActivate {

  constructor(
    private authSvc: AuthService, 
    private router: Router
  ) { }

  canActivate(): Observable<boolean> {
    return this.authSvc.user$.pipe(map(user => {
      if(user.perfil === 'profesional') 
        return true;

      console.log('Access Denied');
      this.router.navigate(['/inicio']);
      return false;  
    }));
  }
  
}
