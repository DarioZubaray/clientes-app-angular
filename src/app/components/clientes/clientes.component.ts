import { Component, OnInit } from '@angular/core';
import { Cliente } from './cliente';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styles: []
})
export class ClientesComponent implements OnInit {

  clientes: Cliente[] = [
    {id: 1, nombre:'Andrés', apellido: 'Guzmán', email: 'profesor@bolsadeideas.com', createAt:'2017-12-11'},
    {id: 2, nombre:'Darío', apellido: 'Zubaray', email: 'dzubaray@gmail.com', createAt:'2019-19-17'},
    {id: 3, nombre:'Julieta', apellido: 'Zubaray', email: 'jzubaray@gmail.com', createAt:'2019-19-17'}
  ];
  habilitar: boolean = true;

  constructor() { }

  ngOnInit() {
  }

}
