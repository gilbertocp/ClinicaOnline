import { Route } from '@angular/compiler/src/core';
import { Injectable } from '@angular/core';
import { ActivatedRoute, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class CheckAdminGuard implements CanActivate {

  constructor(private authSvc: AuthService, private route: ActivatedRoute, private router: Router) { }

  canActivate(): Observable<boolean> {
    return this.authSvc.user$.pipe(map(user => {
      if(user.perfil === 'administrador') 
        return true;

      this.router.navigate(['/inicio']);
      return false;  
    }));
  }
  
}
