import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Cliente } from './cliente';
import { ClienteService } from '../../services/cliente.service';
import { faPlus, faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

import swal from 'sweetalert2';
import { ModalService } from '../../services/modal.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styles: ['.avatar-sm { width: 64px }']
})
export class ClientesComponent implements OnInit {

  clientes: Cliente[] = [];
  clienteSeleccionado: Cliente;
  habilitar: boolean = true;
  pagina: number = 0;
  paginador: any;
  faPlus = faPlus;
  faEdit = faEdit;
  faTrashAlt = faTrashAlt;

  constructor(private _clienteService: ClienteService,
              private _modalService: ModalService,
              private _authService: AuthService,
              public activatedRouter: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRouter.params.subscribe( params => {
      let page = params['page'];
      if (page) {
        this.pagina = page;
      }
      this._clienteService.getClientes(this.pagina).subscribe( resp => {
        this.clientes = resp.content;
        this.paginador = resp;
        console.log(this.paginador);
      });
    });

    this._modalService.notificarUpload.subscribe(clienteEmitido => {
      this.clientes = this.clientes.map(clienteOriginal => {
        if(clienteOriginal.id == clienteEmitido.id) {
          clienteOriginal.foto = clienteEmitido.foto
        }
        return clienteOriginal;
      });
    });
  }

  public delete(cliente: Cliente): void {

    swal({
      title: 'Está seguro?',
      text: `¿Seguro que desea eliminar al cliente ${cliente.nombre} ${cliente.apellido}?`,
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

        this._clienteService.delete(cliente.id).subscribe(
          () => {
            this.clientes = this.clientes.filter(cli => cli !== cliente)
            swal(
              'Cliente Eliminado!',
              `Cliente ${cliente.nombre} eliminado con éxito.`,
              'success'
            )
          }
        )

      }
    });
  }

  mostrarModal(cliente: Cliente) {
    console.log('ClientesComponent - abrirModal');
    this.clienteSeleccionado = cliente;
    this._modalService.abrirModal();
  }
}
