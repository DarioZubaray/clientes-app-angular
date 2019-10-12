import { Component, OnInit, ViewChild } from '@angular/core';
import { Cliente } from '../../models/cliente';
import { Region } from '../../models/region';
import { ClienteService } from '../../services/cliente.service';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styles: ['.mat-datepicker-toggle { color: white}']
})
export class FormComponent implements OnInit {

  private cliente: Cliente = new Cliente();
  titulo: string = "Crear nuevo cliente";
  errores: string[];
  regiones: Region[];

  constructor(private _clienteService: ClienteService,
              private router: Router,
              private activatedRouter: ActivatedRoute) {
  }

  ngOnInit() {
    this.cargarCliente();
    this.cargarRegiones();
  }

  cargarCliente(): void {
    this.activatedRouter.params.subscribe( params => {
      let id = params['id'];
      if (id) {
        this._clienteService.getCliente(id).subscribe( cliente => this.cliente = cliente );
      }
    });
  }

  cargarRegiones() {
    this._clienteService.getRegiones().subscribe(regiones => this.regiones = regiones);
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
    this.cliente.facturas = null;
    this._clienteService.update(this.cliente).subscribe(respuesta => {
      swal('Cliente Actualizado', `${respuesta.mensaje}: ${respuesta.cliente.nombre}`, 'success');
      this.router.navigate(['clientes']);
    },
    err => {
      this.errores = err.error.errors as string[];
      console.error(err.error.errors);
    });
  }

  compararRegion(o1: Region, o2: Region): boolean {
    if (o1 === undefined && o2 === undefined) {
      return true;
    }
    return o1 == null || o2 == null ? false : o1.id === o2.id;
  }
}
