
import { Routes } from '@angular/router';
import { AuthGuardService } from './login/auth-guard.service';
import { LoginComponent } from './login/login/login.component';
import { WoodFactoryComponent } from './main-panel/buildings/wood-factory/wood-factory.component';
 
import { MainPanelComponent} from './main-panel/main-panel/main-panel.component';
 
 
export const appRoutes: Routes = [
  { path: 'home', component: MainPanelComponent, canActivate : [AuthGuardService] },
  { path: 'WoodFactory', component: WoodFactoryComponent, canActivate : [AuthGuardService] },
  { path: 'login', component: LoginComponent},
  { path: '', redirectTo: 'home', pathMatch: 'full' },
];