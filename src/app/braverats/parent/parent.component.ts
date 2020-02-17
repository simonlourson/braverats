import { Component, OnInit, ViewChild } from '@angular/core';
import {MenubarModule} from 'primeng/menubar';
import {MenuItem, MessageService} from 'primeng/api';
import { LobbyService } from '../services/lobby-service';
import { LobbyJoined } from '../shared/responses';
import { DialogJoinLobbyComponent } from '../dialog-join-lobby/dialog-join-lobby.component';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { Card } from '../card';

@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.css']
})
export class ParentComponent implements OnInit {

  @ViewChild('dialogJoinLobby', {static: true})
  dialogJoinLobby: DialogJoinLobbyComponent;

  menuItems: MenuItem[];

  playerName: string;
  playerNameSubject = new Subject<string>();

  constructor(public lobbyService: LobbyService, private messageService: MessageService) {
    this.playerNameSubject.pipe(
      debounceTime(1000))
      .subscribe(value => {
        this.playerNameChange();
      });
  }

  ngOnInit() {
    this.menuItems = [
      {
          label: 'Game',
          items: [
            {label: 'Create new lobby', icon: 'pi pi-fw pi-users',       command: (event) => { this.createLobby(); }},
            {label: 'Join lobby',       icon: 'pi pi-fw pi-user-plus',  command: (event) => { this.joinLobby(); }},
          ]
      }
    ];

  }

  createLobby() {
    console.log('createLobby')

    this.lobbyService.createLobby().subscribe();
  }

  handleCreateLobbyNext(data: any)
  {
    this.messageService.add({severity:'success', summary:'Lobby created' , detail:'Lobby id : '});
  }

  handleCreateLobbyError()
  {
    this.messageService.add({severity:'error', summary:'Lobby creation Failed'});
  }

  joinLobby() {
    this.dialogJoinLobby.showDialog();
  }

  playerNameChange() {
    this.lobbyService.changeName(this.playerName).subscribe();
  }

  clickCard(card: Card) {
    this.lobbyService.requestPlayCard(card);
  }

}
