import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {TutorRoutingModule} from './tutor-routing.module';
import {TutorComponent} from './tutor.component';
import {SharedModule} from '../../../shared/shared.module';
import {CadastroComponent} from './_components/cadastro/cadastro.component';
import {ConsultaComponent} from './_components/consulta/consulta.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CalendarModule} from 'primeng/calendar';
import {InputTextModule} from 'primeng/inputtext';
import {NgxMaskModule} from 'ngx-mask';
import {FormularioTutorComponent} from './_components/formulario-tutor/formulario-tutor.component';
import {DropdownModule} from 'primeng/dropdown';
import {MultiSelectModule} from 'primeng/multiselect';
import {RippleModule} from 'primeng/ripple';
import {AutoCompleteModule} from 'primeng/autocomplete';
import {RadioButtonModule} from 'primeng/radiobutton';
import {InputNumberModule} from 'primeng/inputnumber';
import {DialogModule} from 'primeng/dialog';
import {TableModule} from 'primeng/table';
import {DetalheComponent} from './_components/detalhe/detalhe.component';
import {FormularioAnimalComponent} from './_components/formulario-animal/formulario-animal.component';
import { TabelaAnimalComponent } from './_components/tabela-animal/tabela-animal.component';


@NgModule({
  declarations: [
    TutorComponent,
    CadastroComponent,
    ConsultaComponent,
    FormularioTutorComponent,
    DetalheComponent,
    FormularioAnimalComponent,
    TabelaAnimalComponent],
  imports: [
    CommonModule,
    TutorRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    CalendarModule,
    InputTextModule,
    NgxMaskModule,
    DropdownModule,
    MultiSelectModule,
    FormsModule,
    RippleModule,
    AutoCompleteModule,
    RadioButtonModule,
    InputNumberModule,
    DialogModule,
    TableModule
  ]
})
export class TutorModule {
}
