import { VoteUpAction, VoteDownAction } from './../models/productos-states.model';
import { AppState } from './../app.module';
import { Store } from '@ngrx/store';
import { Component, OnInit, HostBinding, Input } from '@angular/core';
import { Producto } from './../models/producto.model';
import { AppRoutingModule } from '../app-routing.module';

@Component({
  selector: 'app-producto-component',
  templateUrl: './producto-component.component.html',
  styleUrls: ['./producto-component.component.css']
})
export class ProductoComponentComponent implements OnInit {
  @Input() producto: Producto;
  @HostBinding('attr.class') cssClass = 'col-md-4';
  constructor(private store: Store<AppState>) { }

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
