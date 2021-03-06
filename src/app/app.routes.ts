import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
// Components
import { DecisionComponent } from './components/decision/decision.component';
import { OptionsComponent } from './components/options/options.component';
import { AgainstMachineComponent } from './components/against-machine/against-machine.component';
import { StatisticsComponent } from './components/statistics/statistics.component';
import { LogInComponent } from '../app/components/log-in/log-in.component';
import { CreateGameComponent } from './components/create-game/create-game.component';
import { SessionsComponent } from './components/sessions/sessions.component';
import { GameScreenComponent } from './components/game-screen/game-screen.component';


const APP_ROUTES: Routes = [
  {
    path: 'login',
    component: LogInComponent
  },
  {
     path: 'home',
     component: DecisionComponent
  },
  {
    path: 'options/:game/:email',
    component: OptionsComponent
  },
  {
    path: 'stats',
    component: StatisticsComponent
  },
  {
    path: 'againstmachine/:level/:game',
    component: AgainstMachineComponent
  },
  {
    path: 'createSession/:level/:game',
    component : CreateGameComponent
  },
  {
    path: 'joinSession/:level/:game',
    component: SessionsComponent
  },
  {
    path:'gameScreen/:level/:game',
    component:GameScreenComponent
  },

  {
      path: '**', pathMatch: 'full', redirectTo: 'login'
  }

];
@NgModule({
  imports: [RouterModule.forRoot(APP_ROUTES)],
  exports: [RouterModule]
})

// tslint:disable-next-line: class-name
export class APP_ROUTING { }
// export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES, {useHash:true});
