import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatCardModule} from '@angular/material/card';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';


const ANGULAR_MATERIAL_MODULES = [
  MatCardModule,
  MatSidenavModule,
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule
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
