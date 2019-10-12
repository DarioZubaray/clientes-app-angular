import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { DirectivaComponent } from './components/directiva/directiva.component';
import { ClientesComponent } from './components/clientes/clientes.component';
import { FormComponent } from './components/clientes/form.component';
import { PaginadorComponent } from './components/paginador/paginador.component';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';

import { APP_ROUTES } from './app.routes';

import { registerLocaleData } from '@angular/common';
import localeES from '@angular/common/locales/es';
import { DetalleComponent } from './components/detalle/detalle.component';
import { LoginComponent } from './components/usuarios/login.component';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { PerfilComponent } from './components/usuarios/perfil.component';
import { DetalleFacturaComponent } from './components/facturas/detalle-factura.component';
import { ProductosComponent } from './components/productos/productos.component';
import { ProductosFormComponent } from './components/productos/productos-form.component';
import { FacturasComponent } from './components/facturas/facturas.component';

registerLocaleData(localeES, 'es-AR');

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    DirectivaComponent,
    ClientesComponent,
    FormComponent,
    PaginadorComponent,
    DetalleComponent,
    LoginComponent,
    PerfilComponent,
    DetalleFacturaComponent,
    ProductosComponent,
    ProductosFormComponent,
    FacturasComponent,
  ],
  imports: [
    BrowserModule,
    APP_ROUTES,
    HttpClientModule,
    FormsModule,
    FontAwesomeModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatInputModule,
    MatFormFieldModule
  ],
  providers: [
    {provide: LOCALE_ID, useValue: 'es-AR' },
    {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
