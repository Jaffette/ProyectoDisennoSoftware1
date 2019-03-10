import { Routes, RouterModule } from '@angular/router';
import { DecisionComponent } from './components/decision/decision.component';
import { OptionsComponent } from './components/options/options.component';
import { AgainstMachineComponent } from './components/against-machine/against-machine.component';
import { StatisticsComponent } from './components/statistics/statistics.component';


const APP_ROUTES: Routes = [
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
    path: 'againstmachine/:level/:game',
    component: AgainstMachineComponent
  },
 
  {
      path:'**',pathMatch:'full',redirectTo:'home'
  }

];

export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES, {useHash:true});