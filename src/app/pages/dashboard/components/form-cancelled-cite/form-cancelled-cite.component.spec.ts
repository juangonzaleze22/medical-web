import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormCancelledCiteComponent } from './form-cancelled-cite.component';

describe('FormCancelledCiteComponent', () => {
  let component: FormCancelledCiteComponent;
  let fixture: ComponentFixture<FormCancelledCiteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormCancelledCiteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormCancelledCiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
