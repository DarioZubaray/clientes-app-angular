import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
    console.log(event);
    this.fotoSeleccionada = event.target.files[0];
  }

  subirFoto() {
    console.log(this.cliente);
    this._clienteService.subirFoto(this.fotoSeleccionada, this.cliente.id)
                        .subscribe(cliente => {
      this.cliente = cliente;
      swal('¡La foto se ha subido!', `La foto ${this.cliente.foto} se ha subido correctamente.`, 'success');
    });
  }
}
