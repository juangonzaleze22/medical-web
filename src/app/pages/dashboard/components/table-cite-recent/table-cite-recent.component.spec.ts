import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableCiteRecentComponent } from './table-cite-recent.component';

describe('TableCiteRecentComponent', () => {
  let component: TableCiteRecentComponent;
  let fixture: ComponentFixture<TableCiteRecentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableCiteRecentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TableCiteRecentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
