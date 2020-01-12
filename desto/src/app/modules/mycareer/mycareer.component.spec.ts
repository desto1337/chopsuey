import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MycareerComponent } from './mycareer.component';

describe('MycareerComponent', () => {
  let component: MycareerComponent;
  let fixture: ComponentFixture<MycareerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MycareerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MycareerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
