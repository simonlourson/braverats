import { Observable } from 'rxjs';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LobbyJoinRequest, LobbyJoined, LobbyStatusRequest, LobbyStatus, LobbyCreateRequest, NameChangeRequest, PlayCardRequest } from '../shared/responses';
import { map } from 'rxjs/operators';
import { Card } from '../card';

@Injectable()
export class LobbyService {

  private static localStoragePlayerName: string = 'braverats-playerName';

  public lobbyStatusRequest: LobbyStatusRequest;
  public lobbyUuid: string;
  public playerIndex: number;
  public playerUuid: string;
  private playerName_: string;
  public get playerName() { 
    if (this.playerName_ != null) return this.playerName_;
    else return 'Anonymous';
  }
  public set playerName(value: string) {
    this.playerName_ = value;
    localStorage.setItem(LobbyService.localStoragePlayerName, value);
  }  

  public get lobbyStatusOk() { return this.lobbyStatus != null && this.lobbyStatus.players.length == 2; }
  public get myCards(): number[] {
    return this.lobbyStatus.players[this.playerIndex].remainingCards;
  }
  public get myPlayedCards(): number[] {
    return this.lobbyStatus.cardRows[this.playerIndex];
  }
  public get opponentCards(): number[] {
    return this.lobbyStatus.players[1-this.playerIndex].remainingCards;
  }
  public get opponentPlayedCards(): number[] {
    return this.lobbyStatus.cardRows[1-this.playerIndex];
  }
  public lobbyStatus: LobbyStatus;



  private intervalId: number;

  get isActiveLobby(): boolean { return this.lobbyUuid != null }

  constructor(private http: HttpClient) {
    if (localStorage.getItem(LobbyService.localStoragePlayerName) != null) this.playerName_ = localStorage.getItem(LobbyService.localStoragePlayerName);
  }

  public createLobby(): Observable<any> {
    let lobbyCreateRequest: LobbyCreateRequest = {
      playerName: this.playerName
    }

    return this.request('post', 'createLobby', lobbyCreateRequest);
  }

  public joinLobby(lobbyUuid: string): Observable<any> {

    let lobbyJoinRequest: LobbyJoinRequest = {
      lobbyUuid: lobbyUuid,
      playerName: this.playerName
    }

    return this.request('post', 'joinLobby', lobbyJoinRequest);
  }

  public changeName(name: string) {

    this.playerName = name;

    if (this.lobbyUuid == null) return;

    let nameChangeRequest: NameChangeRequest = {
      lobbyUuid: this.lobbyUuid,
      playerUuid: this.playerUuid,
      playerName: this.playerName
    };

    return this.http.post('/api/changeName', nameChangeRequest);
  }

  private request(method: 'post'|'get', type: 'createLobby'|'joinLobby', body: any): Observable<any> {
    let base;

    if (method === 'post') {
      base = this.http.post(`/api/${type}`, body);
    } else {
      base = this.http.get(`/api/${type}`, body);
    }

    const request = base.pipe(
      map((data: LobbyJoined) => {
        if (data.lobbyUuid) {
          this.lobbyUuid = data.lobbyUuid;
          this.lobbyStatusRequest = {
            lobbyUuid:data.lobbyUuid,
            playerUuid:data.playerUuid
          };
          this.playerUuid = data.playerUuid;
          this.playerIndex = data.playerIndex;

          if (this.intervalId != null) window.clearInterval(this.intervalId);
          this.intervalId = window.setInterval(this.requestLobbyStatus.bind(this), 1000)
        }
        return data;
      })
    );

    return request;
  }

  private requestLobbyStatus() {
    this.http.post('api/lobbyStatus', this.lobbyStatusRequest).pipe(
      map((response: any) => {
        let lobbyStatus = response as LobbyStatus[];
        return lobbyStatus;
      })
    ).subscribe({
      next: this.handleLobbyStatus.bind(this)
    });
  }

  private handleLobbyStatus(lobbyStatus: LobbyStatus) {
    this.lobbyStatus = lobbyStatus;
    //console.log(this.lobbyStatus)
  }

  public requestPlayCard(card: Card) {
    let playCardRequest: PlayCardRequest = {
      lobbyUuid: this.lobbyUuid,
      playerUuid: this.playerUuid,
      value: card.value
    };

    this.http.post('api/playCard', playCardRequest).pipe(
      map((response: any) => {
        let lobbyStatus = response as LobbyStatus[];
        return lobbyStatus;
      })
    ).subscribe({
      next: this.handleLobbyStatus.bind(this)
    });
  }

}