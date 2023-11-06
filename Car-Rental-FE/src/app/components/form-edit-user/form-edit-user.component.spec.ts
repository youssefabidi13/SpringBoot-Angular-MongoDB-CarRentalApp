import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormEditUserComponent } from './form-edit-user.component';

describe('FormEditUserComponent', () => {
  let component: FormEditUserComponent;
  let fixture: ComponentFixture<FormEditUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormEditUserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormEditUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
