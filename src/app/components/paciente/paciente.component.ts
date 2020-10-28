import { Component, OnInit } from '@angular/core';
import { User } from 'firebase';
import { Observable } from 'rxjs';
import { Paciente } from 'src/app/models/paciente';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-paciente',
  templateUrl: './paciente.component.html',
  styleUrls: ['./paciente.component.scss']
})
export class PacienteComponent implements OnInit {

  paciente: Paciente;
  authUser$: Observable<User>;

  constructor(
    private authSvc: AuthService,
  ) { }

  ngOnInit(): void {
    this.authSvc.getCurrentUserData('paciente').subscribe(user => {
      this.paciente = user[0];  
      console.log(this.paciente);
    });

    this.authUser$ = this.authSvc.getCurrentUser();
  }

}
