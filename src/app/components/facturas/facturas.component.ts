import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Factura } from '../../models/factura';
import { ClienteService } from '../../services/cliente.service';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { Observable } from 'rxjs';
import { flatMap, map } from 'rxjs/operators';
import { FacturaService } from '../../services/factura.service';
import { Producto } from '../../models/producto';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { ItemFactura } from '../../models/itemFactura';
import swal from 'sweetalert2';

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
  productosFiltrados: Observable<Producto[]>;

  constructor(private _clienteService: ClienteService,
              private _facturaService: FacturaService,
              public router: Router,
              public activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.productosFiltrados = this.autocompleteControl.valueChanges.pipe(
        map(value =>typeof value === 'string' ? value : value.nombre),
        flatMap(value => value ? this._filter(value) : [])
    );
    this.activatedRoute.paramMap.subscribe(params => {
      let clienteId = +params.get('clienteId');
      this._clienteService.getCliente(clienteId).subscribe(cliente => {
          this.factura.cliente = cliente;
      });
    });
  }

  private _filter(value: string): Observable<Producto[]> {
    const filterValue = value.toLowerCase();

    return this._facturaService.filtrarProductos(filterValue);
  }

  mostrarNombre(producto?: Producto): string | undefined {
    return producto ? producto.nombre : undefined;
  }

  productoSeleccionado(event: MatAutocompleteSelectedEvent): void {
    let producto = event.option.value as Producto;

    if(this.existeItem(producto.id)) {
      this.incrementaCantidad(producto.id);
    } else {
      let nuevoItem = new ItemFactura();
      nuevoItem.producto = producto;
      this.factura.itemFactura.push(nuevoItem);
    }

    this.autocompleteControl.setValue('');
    event.option.focus();
    event.option.deselect();
  }

  actualizarCantidad(productoId: number, event: any): void {
    let cantidad = event.target.value as number;
    if (cantidad == 0) {
      return this.eliminarItemFactura(productoId);
    }

    this.factura.itemFactura = this.factura.itemFactura.map((item: ItemFactura) => {
      if (productoId === item.producto.id) {
        item.cantidad = cantidad;
      }
      return item;
    });
  }

  existeItem(idProducto: number): boolean {
    let existe = false;

    this.factura.itemFactura.forEach((item: ItemFactura) => {
      if (idProducto === item.producto.id) {
        existe = true;
      }
    });
    return existe;
  }

  incrementaCantidad(idProducto: number): void {
    this.factura.itemFactura = this.factura.itemFactura.map((item: ItemFactura) => {
      if (idProducto === item.producto.id) {
        ++item.cantidad;
      }
      return item;
    });
  }

  eliminarItemFactura(id: number): void {
    this.factura.itemFactura = this.factura.itemFactura.filter( (item: ItemFactura) => id !== item.producto.id);
  }

  create(facturaForm): void {
    if (this.factura.itemFactura.length == 0) {
      this.autocompleteControl.setErrors({'invalid': true});
    }

    if (facturaForm.form.valid && this.factura.itemFactura.length > 0) {
      this._facturaService.create(this.factura).subscribe((factura: Factura) => {
        swal('Nueva Factura', `Factura ${factura.descripcion} creada con éxito`, 'success');
        this.router.navigate(['/facturas', factura.id]);
      });
    }
  }
}
