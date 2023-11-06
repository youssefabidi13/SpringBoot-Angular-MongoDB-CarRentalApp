import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarDetaiComponent } from './car-detai.component';

describe('CarDetaiComponent', () => {
  let component: CarDetaiComponent;
  let fixture: ComponentFixture<CarDetaiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarDetaiComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarDetaiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
