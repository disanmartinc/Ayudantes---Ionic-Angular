import { Component, OnInit } from '@angular/core';
import {IonicModule } from '@ionic/angular';
@Component({
  selector: 'app-administrativos',
  templateUrl: './administrativos.page.html',
  styleUrls: ['./administrativos.page.scss'],
  standalone:true,
  imports:[IonicModule],
})
export class AdministrativosPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
