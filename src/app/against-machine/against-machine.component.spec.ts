import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgainstMachineComponent } from './against-machine.component';

describe('AgainstMachineComponent', () => {
  let component: AgainstMachineComponent;
  let fixture: ComponentFixture<AgainstMachineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgainstMachineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgainstMachineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
