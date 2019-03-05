import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AngularMediaComponent } from './angular-media.component';

describe('AngularMediaComponent', () => {
  let component: AngularMediaComponent;
  let fixture: ComponentFixture<AngularMediaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AngularMediaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AngularMediaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
