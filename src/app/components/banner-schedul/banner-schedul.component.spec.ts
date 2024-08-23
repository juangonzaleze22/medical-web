import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BannerSchedulComponent } from './banner-schedul.component';

describe('BannerSchedulComponent', () => {
  let component: BannerSchedulComponent;
  let fixture: ComponentFixture<BannerSchedulComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BannerSchedulComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BannerSchedulComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
