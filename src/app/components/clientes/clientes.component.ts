import { Component, OnInit } from '@angular/core';
import { Cliente } from './cliente';
import { ClienteService } from '../../sevices/cliente.service';

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

}
