import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Factura } from '../../models/factura';
import { ClienteService } from '../../services/cliente.service';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';

@Component({
  selector: 'app-facturas',
  templateUrl: './facturas.component.html',
  styleUrls: ['./facturas.component.css']
})
export class FacturasComponent implements OnInit {

  titulo: string = "Nueva Factura";
  factura: Factura = new Factura();
  faPlus = faPlus;
  autocompleteControl = new FormControl();
  productos: string[] = ['One', 'Two', 'Three'];
  productosFiltrados: Observable<string[]>;

  constructor(private _clienteService: ClienteService,
              public activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.productosFiltrados = this.autocompleteControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
    this.activatedRoute.paramMap.subscribe(params => {
      let clienteId = +params.get('clienteId');
      this._clienteService.getCliente(clienteId).subscribe(cliente => {
          this.factura.cliente = cliente;
      });
    });
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.productos.filter(option => option.toLowerCase().includes(filterValue));
  }
}
