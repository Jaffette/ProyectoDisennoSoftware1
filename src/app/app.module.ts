import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule} from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';


//Routes

import { APP_ROUTING } from './app.routes';

//Components
import { AppComponent } from './app.component';
import { DecisionComponent } from './components/decision/decision.component';
import { CreateGameComponent } from './components/create-game/create-game.component';
import { AgainstMachineComponent } from './components/against-machine/against-machine.component';
import { OptionsComponent } from './components/options/options.component';
import { LogInComponent } from './components/log-in/log-in.component';
import { StatisticsComponent } from './components/statistics/statistics.component';

//Services
import { OptionsService } from './services/options.service';
import { MemoryService } from './services/memory.service';
import { SessionsComponent } from './components/sessions/sessions.component';
import { GameScreenComponent } from './components/game-screen/game-screen.component';
import { RestService } from './services/rest.service';


@NgModule({
  declarations: [
    AppComponent,
    DecisionComponent,
    CreateGameComponent,
    AgainstMachineComponent,
    OptionsComponent,
    StatisticsComponent,
    LogInComponent,
    SessionsComponent,
    GameScreenComponent,
    //
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp({
      apiKey: 'AIzaSyBDaS5cB9zDX3HaTaLtt1kefObGwe3Tomc',
    authDomain: 'design-project-e4d21.firebaseapp.com',
    databaseURL: 'https://design-project-e4d21.firebaseio.com',
    projectId: 'design-project-e4d21',
    storageBucket: 'design-project-e4d21.appspot.com',
    messagingSenderId: '386401663778',
    }),
    AngularFireAuthModule,
    FormsModule,
    APP_ROUTING,
    HttpClientModule
  ],
  providers: [
    OptionsService,
    MemoryService,
    RestService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
