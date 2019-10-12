import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Factura } from '../models/factura';
import { Producto } from '../models/producto';
import { URL_BACKEND } from '../config/config';

@Injectable({
  providedIn: 'root'
})
export class FacturaService {

  private urlEndpoint = URL_BACKEND + "/api/facturas";

  constructor(public http: HttpClient) { }

  getFactura(id: number): Observable<Factura> {
    return this.http.get<Factura>(`${this.urlEndpoint}/${id}`);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.urlEndpoint}/${id}`);
  }

  filtrarProductos(termino: string): Observable<Producto[]> {
    return this.http.get<Producto[]>(`${this.urlEndpoint}/filtrar-productos/${termino}`);
  }

  create(factura: Factura): Observable<Factura> {
    return this.http.post<Factura>(this.urlEndpoint, factura);
  }
}
