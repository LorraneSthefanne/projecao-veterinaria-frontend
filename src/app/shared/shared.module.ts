import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OpcaoComponent } from './opcao/opcao.component';
import {RouterModule} from "@angular/router";
import { CardComponent } from './card/card.component';



@NgModule({
  declarations: [OpcaoComponent, CardComponent],
  exports: [
    OpcaoComponent,
    CardComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class SharedModule { }
