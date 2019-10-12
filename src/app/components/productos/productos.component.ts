import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductoService } from '../../services/producto.service';
import { Producto } from '../../models/producto';
import swal from 'sweetalert2';
import { faPlus, faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styles: []
})
export class ProductosComponent implements OnInit {

  productos: Producto[] = [];
  habilitar: boolean = true;
  pagina: number = 0;
  paginador: any;
  isAdmin: boolean;
  isUser: boolean;
  faPlus = faPlus;
  faEdit = faEdit;
  faTrashAlt = faTrashAlt;

  constructor(private _productoService: ProductoService,
              private _authService: AuthService,
              public activatedRouter: ActivatedRoute) { }

  ngOnInit() {
    this.isAdmin = this._authService.hasRole('ROLE_ADMIN');
    this.isUser = this._authService.hasRole('ROLE_USER');

    this.activatedRouter.params.subscribe( params => {
      let page = params['page'];
      if (page) {
        this.pagina = page;
      }
      this._productoService.getProductos(this.pagina).subscribe( resp => {
        this.productos = resp.content;
        this.paginador = resp;
        console.log(this.paginador);
      });
    });
  }

  public delete(producto: Producto): void {

    swal({
      title: 'Está seguro?',
      text: `¿Seguro que desea eliminar el producto:  ${producto.nombre}?`,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!',
      cancelButtonText: 'No, cancelar!',
      confirmButtonClass: 'btn btn-success',
      cancelButtonClass: 'btn btn-danger',
      buttonsStyling: false,
      reverseButtons: true
    }).then((result) => {
      if (result.value) {

        this._productoService.delete(producto.id).subscribe(
          () => {
            this.productos = this.productos.filter(pro => pro !== producto)
            swal(
              'Cliente Eliminado!',
              `Cliente ${producto.nombre} eliminado con éxito.`,
              'success'
            )
          }
        )

      }
    });
  }

}
