import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MypassionComponent } from './mypassion.component';

describe('MypassionComponent', () => {
  let component: MypassionComponent;
  let fixture: ComponentFixture<MypassionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MypassionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MypassionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
