import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdersRefusedComponent } from './orders-refused.component';

describe('OrdersRefusedComponent', () => {
  let component: OrdersRefusedComponent;
  let fixture: ComponentFixture<OrdersRefusedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrdersRefusedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrdersRefusedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
