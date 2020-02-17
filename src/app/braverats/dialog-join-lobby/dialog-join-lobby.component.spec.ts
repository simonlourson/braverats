import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogJoinLobbyComponent } from './dialog-join-lobby.component';

describe('DialogJoinLobbyComponent', () => {
  let component: DialogJoinLobbyComponent;
  let fixture: ComponentFixture<DialogJoinLobbyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogJoinLobbyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogJoinLobbyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
