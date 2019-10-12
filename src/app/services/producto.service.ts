import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Producto } from '../models/producto';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  private urlEndpoint = 'http://localhost:8080/api/productos';

  constructor(public http: HttpClient,
              public router: Router) { }

  getProductos(page: number): Observable<any> {
    return this.http.get(this.urlEndpoint + '/page/' + page).pipe(
      map((response: any) => {
        console.log(response);
        return response;
      }),
      catchError(e => {
        this.router.navigate(['/productos']);
        return throwError(e);
      })
    );
  }

  create(producto: Producto): Observable<Producto> {
    return this.http.post(this.urlEndpoint, producto).pipe(
      map((response: any) => response.producto as Producto)
    );
  }

  getProducto(id: number): Observable<any> {
    return this.http.get(`${this.urlEndpoint}/${id}`).pipe(
      catchError(e => {
        if (e.status != 401 && e.error.mensaje) {
          this.router.navigate(['/productos']);
          console.error(e.error.mensaje);
        }
        return throwError(e);
      })
    );
  }

  update(producto: Producto): Observable<any> {
    return this.http.put<any>(`${this.urlEndpoint}/${producto.id}`, producto);
  }

  delete(id: number): Observable<any> {
    return this.http.delete<any>(`${this.urlEndpoint}/${id}`);
  }
}
