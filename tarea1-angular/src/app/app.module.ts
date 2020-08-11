import { AuthService } from './services/auth.service';
import { LoginUsuarioGuard } from './guards/login-usuario/login-usuario.guard';
import { ProductosState, reducerProductos, initializeProductosState, InitMyDataAction /*ProductosEffects*/ } from './models/productos-states.model';
import { RouterModule, Routes } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, Injectable, InjectionToken, NgModule } from '@angular/core';
import { ActionReducer, ActionReducerMap, Store, StoreModule as NgRxStoreModule } from '@ngrx/store';
import { Effect, EffectsModule } from '@ngrx/effects';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductoComponentComponent } from './components/producto-component/producto-component.component';
import { ListaProductosComponent } from './components/lista-productos/lista-productos.component';
import { FormularioProductoComponent } from './components/formulario-producto/formulario-producto.component';
import { DetalleProductoComponentComponent } from './components/detalle-producto-component/detalle-producto-component.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './components/login/login/login.component';
import { ProtectedComponent } from './components/protected/protected/protected.component';
import { HttpClientModule, HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Producto } from './models/producto.model';
import Dexie from 'dexie';

export interface appConfig {
  apiEndPoint: string;
}

const APP_CONFIG_VALUE: appConfig = {
  apiEndPoint: 'http://localhost:3000'
};

export const APP_CONFIG = new InjectionToken<appConfig>('app.config'); // variables para integración con servidor



const rutas: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: ListaProductosComponent},
  {path: 'detalle', component: DetalleProductoComponentComponent},
  {path: 'Login', component: LoginComponent},
  {path: 'protected', component: ProtectedComponent, canActivate: [LoginUsuarioGuard]}
];
// Como interfaz los estados de la aplicacion
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

// init appLoad
export function init_app(appLoadService: AppLoadService): () => Promise<any> {
  return () => appLoadService.initializeProductosState();
}

@Injectable()
class AppLoadService{
  constructor(private store: Store<AppState>, private http: HttpClient ){}
  async initializeProductosState(): Promise<any> {
    const headers: HttpHeaders = new HttpHeaders({'X-API-TOKEN': 'token-seguridad'});
    const req = new HttpRequest('GET', APP_CONFIG_VALUE.apiEndPoint + '/my', {headers: headers});
    const response: any = await this.http.request(req).toPromise();
    this.store.dispatch(new InitMyDataAction(response.body));
  }
}
// fin

// init dexie db
export class Translation {
  constructor(public id: number, public lang: string, public key: string, public value: string){}
}


@Injectable({
  providedIn: 'root'
})
export class MyDatabase extends Dexie{
  productos: Dexie.Table<Producto, number>;
  translations: Dexie.Table<Translation, number>;
  constructor(){
    super('MyDatabase');
    this.version(1).stores({
      destinos: '++id,nombre,imagenUrl', // primeraversion base de datos
    });
    this.version(2).stores({
      destinos: '++id,nombre,imagenUrl', // segunda version base de datos
      translations: '++id,, lang, key, value'
    });
  }
}

export const db = new MyDatabase();
// fin dexie db

@NgModule({
  declarations: [
    AppComponent,
    ProductoComponentComponent,
    ListaProductosComponent,
    FormularioProductoComponent,
    DetalleProductoComponentComponent,
    LoginComponent,
    ProtectedComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(rutas),
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgRxStoreModule.forRoot(reducers, {initialState: reducersInitialState}),
    // EffectsModule.forRoot([ProductosEffects]),
    HttpClientModule
  ],
  providers: [AuthService,
    {provide: APP_CONFIG, useValue: APP_CONFIG_VALUE},
    AppLoadService,
    {provide: APP_INITIALIZER, useFactory: init_app, deps: [AppLoadService], multi: true}], // va a retornar una funcion con retorno
  bootstrap: [AppComponent]
})
export class AppModule { }
