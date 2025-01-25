import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';


@Component({
  selector: 'app-trabajos',
  templateUrl: './trabajos.component.html',
  styleUrls: ['./trabajos.component.scss'],
  standalone:true,
  imports:[IonicModule]

})
export class TrabajosComponent  implements OnInit {

  pageTitle = 'Listado de trabajos';
  constructor() { }

  ngOnInit() {}

}
