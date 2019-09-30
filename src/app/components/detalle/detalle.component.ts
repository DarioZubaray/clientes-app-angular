import { Component, OnInit, Input } from '@angular/core';
import { HttpEventType } from '@angular/common/http';
import { Cliente } from '../clientes/cliente';
import { ClienteService } from '../../services/cliente.service';
import swal from 'sweetalert2';
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'detalle-cliente',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css']
})
export class DetalleComponent implements OnInit {

  titulo: string = "Detalle del cliente ";
  @Input() cliente: Cliente;
  progreso: number = 0;
  private fotoSeleccionada: File;

  constructor(private _clienteService: ClienteService,
              public _modalService: ModalService) { }

  ngOnInit() {

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
}
