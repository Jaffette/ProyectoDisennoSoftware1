import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
//Components
import { DecisionComponent } from './components/decision/decision.component';
import { OptionsComponent } from './components/options/options.component';
import { AgainstMachineComponent } from './components/against-machine/against-machine.component';
import { StatisticsComponent } from './components/statistics/statistics.component';
import { LogInComponent } from '../app/components/log-in/log-in.component';

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
    path: 'options/:game',
    component: OptionsComponent
  },
  {
    path:'stats',
    component: StatisticsComponent
  },
  {
    path: 'againstmachine',
    component: AgainstMachineComponent
  },
 
  {
      path:'**',pathMatch:'full',redirectTo:'home'
  }

];
@NgModule({
  imports: [RouterModule.forRoot(APP_ROUTES)],
  exports: [RouterModule]
})

export class APP_ROUTING { }
//export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES, {useHash:true});