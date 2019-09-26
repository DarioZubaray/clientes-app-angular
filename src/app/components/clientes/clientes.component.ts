import { Component, OnInit } from '@angular/core';
import { Cliente } from './cliente';
import { ClienteService } from '../../sevices/cliente.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styles: []
})
export class ClientesComponent implements OnInit {

  clientes: Cliente[] = [];
  habilitar: boolean = true;

  constructor(private _clienteService: ClienteService) { }

  ngOnInit() {
    this._clienteService.getClientes().subscribe( resp => {
      this.clientes = resp;
    });
  }

  public delete(cliente: Cliente): void {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    });

    swalWithBootstrapButtons.fire({
      title: '¿Está seguro?',
      text: `¿Seguro que desea eliminar al cliente ${cliente.nombre} ${cliente.apellido}?`,
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, ¡Borrarlo!',
      cancelButtonText: 'No, ¡Cancelar!',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
        this.clientes = this.clientes.filter(cli => cli !== cliente);
        this._clienteService.delete(cliente.id).subscribe( () => {
          swalWithBootstrapButtons.fire(
            '¡Borrado!',
            `El cliente ${cliente.nombre} ${cliente.apellido} ha sido eliminado.`,
            'success'
          );
        });
      }
    });
  }
}
