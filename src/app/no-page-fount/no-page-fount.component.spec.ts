import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoPageFountComponent } from './no-page-fount.component';

describe('NoPageFountComponent', () => {
  let component: NoPageFountComponent;
  let fixture: ComponentFixture<NoPageFountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NoPageFountComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NoPageFountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
