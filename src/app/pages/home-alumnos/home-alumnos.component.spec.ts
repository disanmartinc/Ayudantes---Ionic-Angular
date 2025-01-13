import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { HomeAlumnosComponent } from './home-alumnos.component';

describe('HomeAlumnosComponent', () => {
  let component: HomeAlumnosComponent;
  let fixture: ComponentFixture<HomeAlumnosComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [HomeAlumnosComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeAlumnosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
