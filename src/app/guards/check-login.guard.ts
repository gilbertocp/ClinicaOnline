import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CheckLoginGuard implements CanActivate {

  constructor(private authSvc: AuthService, private router: Router)  {  }

  canActivate(): Observable<boolean> {
    return this.authSvc.getCurrentUser().pipe(map(user => {
      if(user)  {
        return true;
      }

      this.router.navigate(['/iniciarSesion']);
      return false;
    }));
  }
  
}
