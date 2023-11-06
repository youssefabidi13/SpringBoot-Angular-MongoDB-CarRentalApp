import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdersAcceptedComponent } from './orders-accepted.component';

describe('OrdersAcceptedComponent', () => {
  let component: OrdersAcceptedComponent;
  let fixture: ComponentFixture<OrdersAcceptedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrdersAcceptedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrdersAcceptedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
