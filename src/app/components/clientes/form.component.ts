import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDatepicker } from '@angular/material';
import { Cliente } from './cliente';
import { ClienteService } from '../../sevices/cliente.service';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styles: ['.mat-datepicker-toggle { color: white}']
})
export class FormComponent implements OnInit {

  titulo: string = "Crear nuevo cliente";
  private cliente: Cliente = new Cliente();
  private errores: string[];
  @ViewChild(MatDatepicker) miDatepicker: MatDatepicker<Date>;

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

  create(): void {
    console.log('clicked');
    this._clienteService.create(this.cliente)
        .subscribe( cliente => {
          swal('Nuevo Cliente', `El cliente ${cliente.nombre} ha sido creado con éxito`, 'success');
          this.router.navigate(['clientes']);
        },
        err => {
          this.errores = err.error.errors as string[];
          console.error(err.error.errors);
        });
  }

  update(): void {
    this._clienteService.update(this.cliente).subscribe(respuesta => {
      swal('Cliente Actualizado', `${respuesta.mensaje}: ${respuesta.cliente.nombre}`, 'success');
      this.router.navigate(['clientes']);
    },
    err => {
      this.errores = err.error.errors as string[];
      console.error(err.error.errors);
    });
  }
}
