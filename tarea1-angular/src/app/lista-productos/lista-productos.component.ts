import { NuevoProductoAction } from './../models/productos-states.model';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Producto } from './../models/producto.model';
import { AppState } from '../app.module';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-lista-productos',
  templateUrl: './lista-productos.component.html',
  styleUrls: ['./lista-productos.component.css']
})
export class ListaProductosComponent implements OnInit {
  productos: Producto[];
  @Output() productoAgregado: EventEmitter<Producto>;
  all;
  constructor(private store: Store<AppState>) {
    this.productos = [];
    this.all = store.select(state => state.productos.items).subscribe(items => this.all = items);
   }

  ngOnInit(): void {
  }

  agregado(p: Producto): boolean{
    this.store.dispatch(new NuevoProductoAction(p));
    console.log('se agreggoooooo');
    return false;
  }

}
