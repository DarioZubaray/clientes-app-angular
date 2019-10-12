import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Factura } from '../../models/factura';
import { ClienteService } from '../../services/cliente.service';

@Component({
  selector: 'app-facturas',
  templateUrl: './facturas.component.html',
  styles: []
})
export class FacturasComponent implements OnInit {

  titulo: string = "Nueva Factura";
  factura: Factura = new Factura();

  constructor(private _clienteService: ClienteService,
              public activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(params => {
      let clienteId = +params.get('clienteId');
      this._clienteService.getCliente(clienteId).subscribe(cliente => {
          this.factura.cliente = cliente;
      });
    });
  }

}
