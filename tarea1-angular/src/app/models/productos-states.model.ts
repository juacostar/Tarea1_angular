import { Producto } from './producto.model';
import { Injectable } from '@angular/core';
import { Action, State } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';


// Estado global
export interface ProductosState{
  items: Producto[];
  loading: boolean;
  favorito: Producto;
}

export const initializeProductosState = function(){
  return{
    items: [],
    loading: false,
    favorito: null
  };
};


// ACCIONES
export enum ProductsActionTypes {
  NUEVO_PRODUCTO = '[Producto] Nuevo',
  ELEGIDO_FAVORITO = '[Producto] Favorito',
  VOTE_UP = '[Producto] Vote Up',
  VOTE_DOWN = '[Producto] Vote Down'
}

export class NuevoProductoAction implements Action{
  type = ProductsActionTypes.NUEVO_PRODUCTO;
  constructor(public producto: Producto){}
}

export class ElegidoFavoritoAction implements Action{
  type = ProductsActionTypes.ELEGIDO_FAVORITO;
  constructor(public producto: Producto){}
}

export class VoteUpAction implements Action{
  type = ProductsActionTypes.VOTE_UP;
  constructor(public producto: Producto){}
}

export class VoteDownAction implements Action{
  type = ProductsActionTypes.VOTE_DOWN;
  constructor(public producto: Producto){}
}

export type ProductosActions = NuevoProductoAction | ElegidoFavoritoAction | VoteUpAction | VoteDownAction;

// REDUCERS, respuestas ante los estados

export function reducerProductos(
  state: ProductosState,
  action: ProductosActions
): ProductosState {
  switch(action.type){
    case ProductsActionTypes.NUEVO_PRODUCTO: {
      return {
        ...state,
        items: [...state.items, (action as NuevoProductoAction).producto]
      };
    }
    case ProductsActionTypes.ELEGIDO_FAVORITO: {
      state.items.forEach(x => x.setSelected(false));
      const fav: Producto = (action as ElegidoFavoritoAction).producto;
      fav.setSelected(true);
      return{
        ...state,
        favorito: fav
      };
    }
    case ProductsActionTypes.VOTE_UP: {
      const e: Producto = (action as VoteUpAction).producto;
      e.voteUp();
      return{...state};
    }
    case ProductsActionTypes.VOTE_DOWN: {
      const d: Producto = (action as VoteDownAction).producto;
      d.voteDown();
      console.log('Se esta votando');
      return{...state};
    }
  }
  return state;
}

/*
// EFFECTS
@Injectable()
export class ProductosEffects {
  @Effect()
  nuevoAgregado$: Observable<Action> = this.actions$.pipe(
    ofType(ProductsActionTypes.NUEVO_PRODUCTO)
  );
  constructor(private actions$: Actions){}
}
*/


