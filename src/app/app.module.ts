import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {ToastModule} from 'primeng/toast';
import {BlockUIModule} from 'ng-block-ui';
import {IConfig, MaskApplierService, NgxMaskModule} from 'ngx-mask';
import {MessageService} from 'primeng/api';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {JwtInterceptor} from './_helpers/jwt.interceptor';
import {ErrorInterceptor} from './_helpers/error.interceptor';
import {TooltipModule} from 'primeng/tooltip';
import {ButtonModule} from 'primeng/button';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

export const maskConfig: Partial<IConfig> | (() => Partial<IConfig>) | null = {
  validation: true,
};

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ToastModule,
    BlockUIModule,
    TooltipModule,
    ButtonModule,
    NgxMaskModule.forRoot(maskConfig),
    BlockUIModule.forRoot(),
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [
    MessageService,
    MaskApplierService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
