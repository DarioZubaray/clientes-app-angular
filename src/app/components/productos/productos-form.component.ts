import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';
import { Producto } from '../../models/producto';
import { ProductoService } from '../../services/producto.service';
import { faEdit } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-productos-form',
  templateUrl: './productos-form.component.html',
  styles: []
})
export class ProductosFormComponent implements OnInit {

  public producto: Producto = new Producto();
  titulo: string = "Crear nuevo producto";
  errores: string[];
  faEdit = faEdit;

  constructor(private _productoService: ProductoService,
              private router: Router,
              private activatedRouter: ActivatedRoute) { }

  ngOnInit() {
    this.cargarProducto();
  }

  cargarProducto(): void {
    this.activatedRouter.params.subscribe( params => {
      let id = params['id'];
      if (id) {
        this._productoService.getProducto(id).subscribe( producto => this.producto = producto );
      }
    });
  }

  create(): void {
    console.log('clicked');
    this._productoService.create(this.producto)
        .subscribe( producto => {
          swal('Nuevo Producto', `El producto ${producto.nombre} ha sido creado con éxito`, 'success');
          this.router.navigate(['productos']);
        },
        err => {
          this.errores = err.error.errors as string[];
          console.error(err.error.errors);
        });
  }

  update(): void {
    this._productoService.update(this.producto).subscribe(respuesta => {
      swal('Producto Actualizado', `${respuesta.mensaje}: ${respuesta.producto.nombre}`, 'success');
      this.router.navigate(['productos']);
    },
    err => {
      this.errores = err.error.errors as string[];
      console.error(err.error.errors);
    });
  }
}
