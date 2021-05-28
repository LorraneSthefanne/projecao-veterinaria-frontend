import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {DashboardRoutingModule} from './dashboard-routing.module';
import {HomeComponent} from './home/home.component';
import {SharedModule} from '../../shared/shared.module';
import {DropdownModule} from 'primeng/dropdown';
import {CalendarModule} from 'primeng/calendar';
import {RippleModule} from 'primeng/ripple';
import {ReactiveFormsModule} from '@angular/forms';
import {AutoCompleteModule} from 'primeng/autocomplete';


@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule,
    DropdownModule,
    CalendarModule,
    RippleModule,
    ReactiveFormsModule,
    AutoCompleteModule
  ]
})
export class DashboardModule {
}
