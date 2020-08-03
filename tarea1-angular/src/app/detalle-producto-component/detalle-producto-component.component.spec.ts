import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleProductoComponentComponent } from './detalle-producto-component.component';

describe('DetalleProductoComponentComponent', () => {
  let component: DetalleProductoComponentComponent;
  let fixture: ComponentFixture<DetalleProductoComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetalleProductoComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleProductoComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
