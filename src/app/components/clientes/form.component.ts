import { Component, OnInit } from '@angular/core';
import { Cliente } from './cliente';
import { ClienteService } from '../../sevices/cliente.service';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styles: []
})
export class FormComponent implements OnInit {

  titulo: string = "Crear nuevo cliente";
  private cliente: Cliente = new Cliente();

  constructor(private _clienteService: ClienteService,
              private router: Router,
              private activatedRouter: ActivatedRoute) {
  }

  ngOnInit() {
    this.cargarCliente();
  }

  cargarCliente(): void {
    this.activatedRouter.params.subscribe( params => {
      let id = params['id'];
      if (id) {
        this._clienteService.getCliente(id).subscribe( cliente => this.cliente = cliente );
      }
    });
  }

  public create(): void {
    console.log('clicked');
    this._clienteService.create(this.cliente)
        .subscribe( cliente => {
          Swal.fire('Nuevo Cliente', `Cliente ${cliente.nombre} creado con éxito`, 'success');
          this.router.navigate(['clientes']);
        });
  }

  public update(): void {
    this._clienteService.update(this.cliente).subscribe(cliente => {
      Swal.fire('Cliente Actualizado', `Cliente ${cliente.nombre} actualizado con éxito`, 'success');
      this.router.navigate(['clientes']);
    });
  }
}
