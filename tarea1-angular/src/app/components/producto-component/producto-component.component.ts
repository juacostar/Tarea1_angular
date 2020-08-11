import { VoteUpAction, VoteDownAction } from './../../models/productos-states.model';
import { appConfig, AppState, APP_CONFIG, db } from './../../app.module';
import { Store } from '@ngrx/store';
import { Component, OnInit, HostBinding, Input, InjectionToken, Injectable, Inject, forwardRef } from '@angular/core';
import { Producto } from './../../models/producto.model';
import { AppRoutingModule } from './../../app-routing.module';
import { HttpHeaders, HttpRequest, HttpResponse, HttpClient } from '@angular/common/http';
import { ElegidoFavoritoAction, NuevoProductoAction } from 'src/app/models/productos-states.model';


export class ProductoApiClientBase{
  getByName(nombre: string): boolean{
    console.log('clase padre');
    return false;
  }
}
@Injectable()
export class ProductosApiClient{
  productos: Producto[] = [];
  getById(id: string): Producto {
    return this.productos.filter(function(d){return d.id.toString() === id;})[0];
  }
  constructor(private store: Store<AppState>, @Inject(forwardRef(() => APP_CONFIG)) private config: appConfig, private http: HttpClient){
  }

  add(d: Producto) {
    const headers: HttpHeaders = new HttpHeaders({'X-API-TOKEN': 'TOKEN SEGURIDAD'}); // agrega token de seguridad
    const req = new HttpRequest('POST', this.config.apiEndPoint + '/my', {nuevo: d.nombre}, {headers: headers});
    this.http.request(req).subscribe((data: HttpResponse<{}>) => {
      if (data.status === 200){ // codigo de estado de respuesta
        this.store.dispatch(new NuevoProductoAction(d));
       /* const myDb = db; // es inicializacion exportada
        myDb.productos.add(d);
        console.log('todos los productos de la db');
        myDb.productos.toArray().then(productos => console.log(productos));
        */
      }
    });
  }

  elegir(d: Producto){
    this.store.dispatch(new ElegidoFavoritoAction(d));
  }
}


interface AppConfigProducto{
  apiEndPoint: string;
}

const APP_CONFIG_VALUE_PRODUCTO: AppConfigProducto = {
  apiEndPoint: 'mi_api.com'
};

const APP_CONFIG_PRODUCTO = new InjectionToken<AppConfigProducto>('app.config');

export class ProductoApiClient extends ProductoApiClientBase{
  getByName(nombre: string): boolean{
    console.log('clase hija');
    return false;
  }
}

export class ProductoApiClient2 extends ProductoApiClientBase{
  getByName(nombre: string): boolean{
    console.log('clase hija segunda');
    return false;
  }
}

@Component({
  selector: 'app-producto-component',
  templateUrl: './producto-component.component.html',
  styleUrls: ['./producto-component.component.css'],
  providers: [
    {provide: APP_CONFIG_PRODUCTO, useValue: APP_CONFIG_VALUE_PRODUCTO},
    {provide: ProductoApiClient, useClass: ProductoApiClientBase}, // primero clase padre luego clase hijo
    {provide: ProductoApiClient, useExisting: ProductoApiClient2} // clases compatibles deben ser
  ]
})
export class ProductoComponentComponent implements OnInit {
  @Input() producto: Producto;
  @HostBinding('attr.class') cssClass = 'col-md-4';
  productos: Producto[] = [];
  getById(id: string): Producto {
    return this.productos.filter(function(d){return d.id.toString() === id;})[0];
  }
  constructor(private store: Store<AppState>, @Inject(forwardRef(() => APP_CONFIG)) private config: appConfig, private http: HttpClient){
  }

  add(d: Producto) {
    const headers: HttpHeaders = new HttpHeaders({'X-API-TOKEN': 'TOKEN SEGURIDAD'}); // agrega token de seguridad
    const req = new HttpRequest('POST', this.config.apiEndPoint + '/my', {nuevo: d.nombre}, {headers: headers});
    this.http.request(req).subscribe((data: HttpResponse<{}>) => {
      if (data.status === 200){ // codigo de estado de respuesta
        this.store.dispatch(new NuevoProductoAction(d));
        const myDb = db; // es inicializacion exportada
        myDb.productos.add(d);
        console.log('todos los productos de la db');
        myDb.productos.toArray().then(productos => console.log(productos));
      }
    });
  }

  elegir(d: Producto){
    this.store.dispatch(new ElegidoFavoritoAction(d));
  }
  ngOnInit(): void {
  }

  voteUp(): boolean{
    this.store.dispatch(new VoteUpAction(this.producto));
    return false;
  }

  voteDown(): boolean{
    this.store.dispatch(new VoteDownAction(this.producto));
    return false;
  }

}
