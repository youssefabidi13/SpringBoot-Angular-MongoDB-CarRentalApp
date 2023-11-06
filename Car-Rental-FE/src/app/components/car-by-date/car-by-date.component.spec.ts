import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarByDateComponent } from './car-by-date.component';

describe('CarByDateComponent', () => {
  let component: CarByDateComponent;
  let fixture: ComponentFixture<CarByDateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarByDateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarByDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
