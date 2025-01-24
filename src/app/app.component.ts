import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MenuComponent } from './components/menu/menu.component';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    RouterModule,
    MenuComponent,

  ],
})
export class AppComponent {
  constructor() {
    document.addEventListener('ionMenuWillClose', () => {
      const menu = document.querySelector('ion-menu');
      if (menu) menu.setAttribute('aria-hidden', 'true');
    });

    document.addEventListener('ionMenuWillOpen', () => {
      const menu = document.querySelector('ion-menu');
      if (menu) menu.removeAttribute('aria-hidden');
    });
  }
}