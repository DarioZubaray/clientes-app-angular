import { Component, OnInit, Input } from '@angular/core';
import { HttpEventType } from '@angular/common/http';
import { Cliente } from '../../models/cliente';
import { ClienteService } from '../../services/cliente.service';
import swal from 'sweetalert2';
import { ModalService } from '../../services/modal.service';
import { AuthService } from '../../services/auth.service';
import { FacturaService } from '../../services/factura.service';
import { Factura } from '../../models/factura';
import { faPlus, faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'detalle-cliente',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css']
})
export class DetalleComponent implements OnInit {

  titulo: string = "Detalle del cliente ";
  @Input() cliente: Cliente;
  progreso: number = 0;
  isAdmin: boolean;
  isUser: boolean;
  modal: any;
  faPlus = faPlus;
  faEdit = faEdit;
  faTrashAlt = faTrashAlt;
  private fotoSeleccionada: File;

  constructor(private _clienteService: ClienteService,
              private _modalService: ModalService,
              private _authService: AuthService,
              private _facturaService: FacturaService) { }

  ngOnInit() {
    this.modal = this._modalService.modal;
    this.isAdmin = this._authService.hasRole('ROLE_ADMIN');
    this.isUser = this._authService.hasRole('ROLE_USER');
  }

  seleccionarFoto(event) {
    this.progreso = 0;
    this.fotoSeleccionada = event.target.files[0];
    if (this.fotoSeleccionada.type.indexOf('image') < 0) {
      swal('Error en la foto', 'El archivo debe ser del tipo imagen', 'error');
      this.fotoSeleccionada = null;
    }
  }

  subirFoto() {
    if (!this.fotoSeleccionada) {
      swal('Error en la foto', 'Debe seleccionar una foto', 'error');
    } else {
      console.log(this.cliente);
      this._clienteService.subirFoto(this.fotoSeleccionada, this.cliente.id)
                          .subscribe(event => {

        if (event.type === HttpEventType.UploadProgress) {
          this.progreso = Math.round(100 * event.loaded / event.total);
        } else if (event.type === HttpEventType.Response) {
          let response: any = event.body;
          this.cliente = response.cliente as Cliente;

          this._modalService.notificarUpload.emit(this.cliente);
          swal('¡La foto se ha subido!', response.mensaje, 'success');
        }

      });
    }
  }

  cerrarModal() {
    this.fotoSeleccionada = null;
    this.progreso = 0;
    this._modalService.cerrarModal();
  }

  delete(factura: Factura): void {

    swal({
      title: 'Está seguro?',
      text: `¿Seguro que desea eliminar la factura ${factura.descripcion}`,
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

        this._facturaService.delete(factura.id).subscribe(
          () => {
            this.cliente.facturas = this.cliente.facturas.filter(fac => fac !== factura);
            swal(
              '¡Factura Eliminada!',
              `La factura ${factura.descripcion} ha sido eliminada con éxito.`,
              'success'
            )
          }
        )

      }
    });
  }
}
