import { Producto } from './../../models/producto.model';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ValidatorFn, FormControl } from '@angular/forms';

@Component({
  selector: 'app-formulario-producto',
  templateUrl: './formulario-producto.component.html',
  styleUrls: ['./formulario-producto.component.css']
})
export class FormularioProductoComponent implements OnInit {
  fg: FormGroup;
  minLong = 3;
  @Output() productoAgregado: EventEmitter<Producto>;

  constructor(fb: FormBuilder) {
    this.productoAgregado = new EventEmitter();
    this.fg = fb.group({
      nombre: ['', Validators.compose([Validators.required, this.nombreValidator, this.nombreValidatorParamterizable(this.minLong)])],
      descripcion: ['']
    });
  }

  ngOnInit(): void {
  }

  guardar(nombre: string, descripcion: string): boolean{
    const p = new Producto(nombre, descripcion);
    this.productoAgregado.emit(p);
    return false;

  }

  nombreValidator(control: FormControl): {[s: string]: boolean} {
    const v = control.value.toString().trim().length;
    if (v > 0 && v < 5){
      return{ invalido: true};
    }
    return null;
  }

  nombreValidatorParamterizable(minLong: number): ValidatorFn{
    return(control: FormControl): { [s: string]: boolean}|null => {
      const v = control.value.toString().trim().length;
      if (v > 0 && v < minLong){
        return{ invalidoParametrizable: true};
      }
      return null;
    }

  }

}
