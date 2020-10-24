import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-paciente',
  templateUrl: './paciente.component.html',
  styleUrls: ['./paciente.component.scss']
})
export class PacienteComponent implements OnInit {

  userFirebase$;

  constructor(
    public authSvc: AuthService
  ) { }

  ngOnInit(): void {
    this.userFirebase$ = this.authSvc.getCurrentUser();
  }

}
