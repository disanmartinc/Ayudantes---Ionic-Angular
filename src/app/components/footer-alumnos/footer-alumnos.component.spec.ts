import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { FooterAlumnosComponent } from './footer-alumnos.component';

describe('FooterAlumnosComponent', () => {
  let component: FooterAlumnosComponent;
  let fixture: ComponentFixture<FooterAlumnosComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [FooterAlumnosComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FooterAlumnosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
