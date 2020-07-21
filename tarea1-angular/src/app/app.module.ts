import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductoComponentComponent } from './producto-component/producto-component.component';
import { ListaProductosComponent } from './lista-productos/lista-productos.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductoComponentComponent,
    ListaProductosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
