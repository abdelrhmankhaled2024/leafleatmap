import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AfiComponent } from './afi.component';

describe('AfiComponent', () => {
  let component: AfiComponent;
  let fixture: ComponentFixture<AfiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AfiComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AfiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
