import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardInfoGraphComponent } from './card-info-graph.component';

describe('CardInfoGraphComponent', () => {
  let component: CardInfoGraphComponent;
  let fixture: ComponentFixture<CardInfoGraphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardInfoGraphComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CardInfoGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
