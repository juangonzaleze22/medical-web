import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CiteInfoComponent } from './cite-info.component';

describe('CiteInfoComponent', () => {
  let component: CiteInfoComponent;
  let fixture: ComponentFixture<CiteInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CiteInfoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CiteInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
