import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MyAccountComponent } from './my-account.component';
import {AbstractControl} from '@angular/forms';

describe('MyAccountComponent', () => {
  let component: MyAccountComponent;
  let fixture: ComponentFixture<MyAccountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyAccountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create a login form with 2 input fields', () => {
    expect(component.account.contains('email')).toBeTruthy();
    expect(component.account.contains('pwd')).toBeTruthy();

  });

  it('should make login form input fields required', () => {
    const controlName: AbstractControl = component.account.get('name');
    const controlPwd: AbstractControl = component.account.get('pwd');
    controlName.setValue('');
    controlPwd.setValue('');
    expect(controlName.valid).toBeFalsy();
    expect(controlPwd.valid).toBeFalsy();
  });

});
