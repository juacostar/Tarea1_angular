import { Component, OnInit, HostBinding, Input } from '@angular/core';
import { Producto } from './../models/producto.model';

@Component({
  selector: 'app-producto-component',
  templateUrl: './producto-component.component.html',
  styleUrls: ['./producto-component.component.css']
})
export class ProductoComponentComponent implements OnInit {
  @Input producto:Producto;
  @HostBinding('attr.class') cssClass= 'col-md-4';
  constructor() { }

  ngOnInit(): void {
  }

}
