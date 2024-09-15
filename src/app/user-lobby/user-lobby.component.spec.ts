import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserLobbyComponent } from './user-lobby.component';

describe('UserLobbyComponent', () => {
  let component: UserLobbyComponent;
  let fixture: ComponentFixture<UserLobbyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserLobbyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserLobbyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
