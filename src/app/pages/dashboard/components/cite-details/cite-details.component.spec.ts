import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CiteDetailsComponent } from './cite-details.component';

describe('CiteDetailsComponent', () => {
  let component: CiteDetailsComponent;
  let fixture: ComponentFixture<CiteDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CiteDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CiteDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
