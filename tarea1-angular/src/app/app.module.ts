import { ProductosState, reducerProductos, initializeProductosState, /*ProductosEffects*/ } from './models/productos-states.model';
import { RouterModule, Routes } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ActionReducer, ActionReducerMap, StoreModule as NgRxStoreModule } from '@ngrx/store';
import { Effect, EffectsModule } from '@ngrx/effects';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductoComponentComponent } from './producto-component/producto-component.component';
import { ListaProductosComponent } from './lista-productos/lista-productos.component';
import { FormularioProductoComponent } from './formulario-producto/formulario-producto.component';
import { DetalleProductoComponentComponent } from './detalle-producto-component/detalle-producto-component.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const rutas: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: ListaProductosComponent},
  {path: 'detalle', component: DetalleProductoComponentComponent}
];
// Como interfaz los estados de la aplicaciom
export interface AppState{
  productos: ProductosState;
}

// los efectos que conllevan los estados
const reducers: ActionReducerMap<AppState> = {
  productos: reducerProductos
};

// Inicializacion de los estados
const reducersInitialState = {
  productos: initializeProductosState()
};

@NgModule({
  declarations: [
    AppComponent,
    ProductoComponentComponent,
    ListaProductosComponent,
    FormularioProductoComponent,
    DetalleProductoComponentComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(rutas),
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgRxStoreModule.forRoot(reducers, {initialState: reducersInitialState}),
    // EffectsModule.forRoot([ProductosEffects])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
