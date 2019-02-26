import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DecisionComponent } from './decision/decision.component';
import { CreateGameComponent } from './create-game/create-game.component';
import { JoinGameComponent } from './join-game/join-game.component';
import { AgainstMachineComponent } from './against-machine/against-machine.component';

@NgModule({
  declarations: [
    AppComponent,
    DecisionComponent,
    CreateGameComponent,
    JoinGameComponent,
    AgainstMachineComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
