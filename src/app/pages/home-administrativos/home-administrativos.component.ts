import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home-administrativos',
  templateUrl: './home-administrativos.component.html',
  styleUrls: ['./home-administrativos.component.scss'],
  standalone: true,
  imports: [RouterModule, IonicModule, CommonModule],
})
export class HomeAdministrativosComponent {
  pageTitle = 'Home Administrativos';
}
