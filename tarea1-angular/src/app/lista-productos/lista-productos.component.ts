import { Component, OnInit } from '@angular/core';
import { Producto } from './../models/producto.model';

@Component({
  selector: 'app-lista-productos',
  templateUrl: './lista-productos.component.html',
  styleUrls: ['./lista-productos.component.css']
})
export class ListaProductosComponent implements OnInit {
  productos: Producto[];
  constructor() {
    this.productos=[];
   }

  ngOnInit(): void {
  }

  guardar(nombre: String, descripcion: String): boolean{
    this.productos.push(new Producto(nombre,descripcion));
    return false;
  }

}
