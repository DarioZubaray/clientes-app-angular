import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-directiva',
  templateUrl: './directiva.component.html',
  styles: []
})
export class DirectivaComponent implements OnInit {

  listaCurso: string[] = ['TypeScript', 'Javascript', 'NodeJs', 'Dart', 'Java', 'CSharp', 'PHP', 'Python', 'Ruby'];
  habilitar: boolean = false;

  constructor() { }

  ngOnInit() {
  }

}
