import { Component, OnInit } from '@angular/core';
import { faDragon } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: []
})
export class HeaderComponent implements OnInit {

  faDragon = faDragon;
  titulo: string = 'AngularSpring';
  constructor() { }

  ngOnInit() {
  }

}
