import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { HomeAdministrativosComponent } from './home-administrativos.component';

describe('HomeAdministrativosComponent', () => {
  let component: HomeAdministrativosComponent;
  let fixture: ComponentFixture<HomeAdministrativosComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [HomeAdministrativosComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeAdministrativosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
