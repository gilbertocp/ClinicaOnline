import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatCardModule} from '@angular/material/card';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';


const ANGULAR_MATERIAL_MODULES = [
  MatCardModule,
  MatSidenavModule,
  MatButtonModule,
  // MatIconModule,
  // MatDividerModule
];


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ...ANGULAR_MATERIAL_MODULES
  ],
  exports: [
    ...ANGULAR_MATERIAL_MODULES
  ]
})
export class MaterialModule { }
