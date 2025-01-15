import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {IonicModule } from '@ionic/angular';
@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
  standalone:true,
  imports:[IonicModule],
})
export class InicioPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
