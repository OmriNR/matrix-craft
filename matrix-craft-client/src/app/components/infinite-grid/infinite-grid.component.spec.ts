import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfiniteGridComponent } from './infinite-grid.component';

describe('InfiniteGridComponent', () => {
  let component: InfiniteGridComponent;
  let fixture: ComponentFixture<InfiniteGridComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InfiniteGridComponent]
    });
    fixture = TestBed.createComponent(InfiniteGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
