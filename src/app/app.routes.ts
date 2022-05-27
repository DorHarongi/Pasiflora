
import { Routes } from '@angular/router';
import { AuthGuardService } from './login/auth-guard.service';
import { LoginComponent } from './login/login/login.component';
 
import { MainPanelComponent} from './main-panel/main-panel/main-panel.component';
 
 
export const appRoutes: Routes = [
  { path: 'home', component: MainPanelComponent, canActivate : [AuthGuardService] },
  { path: 'login', component: LoginComponent},
  { path: '', redirectTo: 'home', pathMatch: 'full' },
];