import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [
    HomeComponent,
    
  ],
  imports: [
    CommonModule, 
    SharedModule
  ],
  exports:[
    HomeComponent
  ]
})
export class HomeModule { }
