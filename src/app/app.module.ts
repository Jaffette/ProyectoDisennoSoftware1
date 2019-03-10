import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'
import { FormsModule } from '@angular/forms';


//Routes

import { APP_ROUTING } from './app.routes';

//Components
import { AppComponent } from './app.component';
import { DecisionComponent } from './components/decision/decision.component';
import { CreateGameComponent } from './components/create-game/create-game.component';
import { AgainstMachineComponent } from './components/against-machine/against-machine.component';
import { OptionsComponent } from './components/options/options.component';


//Services
import { OptionsService } from './services/options.service';
import { StatisticsComponent } from './components/statistics/statistics.component';





@NgModule({
  declarations: [
    AppComponent,
    DecisionComponent,
    CreateGameComponent,
    AgainstMachineComponent,
    OptionsComponent,
    StatisticsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    APP_ROUTING,
    HttpClientModule
  ],
  providers: [
    OptionsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
