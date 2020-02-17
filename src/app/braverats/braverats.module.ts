import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ParentComponent } from './parent/parent.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MenubarModule } from 'primeng/menubar';
import { ToastModule } from 'primeng/toast'
import { LobbyService } from './services/lobby-service';
import { MessageService } from 'primeng/api';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import {ButtonModule} from 'primeng/button';
import {FieldsetModule} from 'primeng/fieldset';
import { HttpClientModule } from '@angular/common/http';
import { DialogJoinLobbyComponent } from './dialog-join-lobby/dialog-join-lobby.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CardComponent } from './card/card.component';
import { CardArrayPipe } from './pipes/card-array.pipe';



@NgModule({
  declarations: [ParentComponent, DialogJoinLobbyComponent, CardComponent, CardArrayPipe],
  imports: [
    CommonModule, BrowserAnimationsModule, HttpClientModule, FormsModule, ReactiveFormsModule,
    MenubarModule, ToastModule, DialogModule, InputTextModule, ButtonModule, FieldsetModule
  ],
  exports: [ParentComponent],
  providers: [LobbyService, MessageService]
})
export class BraveratsModule { }
