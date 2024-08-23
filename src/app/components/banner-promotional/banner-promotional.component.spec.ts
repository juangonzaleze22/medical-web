import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BannerPromotionalComponent } from './banner-promotional.component';

describe('BannerPromotionalComponent', () => {
  let component: BannerPromotionalComponent;
  let fixture: ComponentFixture<BannerPromotionalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BannerPromotionalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BannerPromotionalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
