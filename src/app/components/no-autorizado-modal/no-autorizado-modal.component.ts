import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-no-autorizado-modal',
  templateUrl: './no-autorizado-modal.component.html',
  styleUrls: ['./no-autorizado-modal.component.scss']
})
export class NoAutorizadoModalComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<NoAutorizadoModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    console.log(this.data);
  }

}
