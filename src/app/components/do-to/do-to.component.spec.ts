import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DoToComponent } from './do-to.component';

describe('DoToComponent', () => {
  let component: DoToComponent;
  let fixture: ComponentFixture<DoToComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DoToComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DoToComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
