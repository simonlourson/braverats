import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Dialog } from 'primeng/dialog';
import { LobbyService } from '../services/lobby-service';

@Component({
  selector: 'app-dialog-join-lobby',
  templateUrl: './dialog-join-lobby.component.html',
  styleUrls: ['./dialog-join-lobby.component.css']
})
export class DialogJoinLobbyComponent implements OnInit {

  @ViewChild('loginDialog', {static: true}) loginDialog: Dialog

  joinForm = new FormGroup({
    lobbyUuid: new FormControl('', [Validators.required]),
  });

  visible: boolean = false;

  constructor(private lobbyService: LobbyService) { }

  ngOnInit() {
  }

  showDialog()
  {
    this.visible = true;
  }

  submit() {
    this.lobbyService.joinLobby(this.joinForm.value.lobbyUuid).subscribe();
    this.visible = false;
  }
}
