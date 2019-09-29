import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpEventType } from '@angular/common/http';
import { Cliente } from '../clientes/cliente';
import { ClienteService } from '../../sevices/cliente.service';
import swal from 'sweetalert2';

@Component({
  selector: 'detalle-cliente',
  templateUrl: './detalle.component.html',
  styles: []
})
export class DetalleComponent implements OnInit {

  titulo: string = "Detalle del cliente ";
  cliente: Cliente;
  progreso: number = 0;
  private fotoSeleccionada: File;

  constructor(private _clienteService: ClienteService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(params => {
      let id = + params.get('id');
      if (id) {
        this._clienteService.getCliente(id).subscribe(cliente => {
          this.cliente = cliente;
          this.titulo = "Detalle del cliente " + cliente.nombre;
        })
      }
    });
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
          this.progreso = Math.round(100 * event.loaded / event.total)
        } else if (event.type === HttpEventType.Response) {
          let response: any = event.body;
          this.cliente = response.cliente as Cliente;
          swal('¡La foto se ha subido!', response.mensaje, 'success');
        }

      });
    }

  }
}
