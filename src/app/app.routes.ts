
import { Routes } from '@angular/router';
import { AuthGuardService } from './login/auth-guard.service';
import { LoginComponent } from './login/login/login.component';
import { ArsenalComponent } from './main-panel/buildings/arsenal/arsenal.component';
import { CenterBuildingComponent } from './main-panel/buildings/center-building/center-building.component';
import { CropFarmComponent } from './main-panel/buildings/crop-farm/crop-farm.component';
import { CropWarehouseComponent } from './main-panel/buildings/crop-warehouse/crop-warehouse.component';
import { EmbassyComponent } from './main-panel/buildings/embassy/embassy.component';
import { QuartersComponent } from './main-panel/buildings/quarters/quarters.component';
import { StoneMineComponent } from './main-panel/buildings/stone-mine/stone-mine.component';
import { StoneWarehouseComponent } from './main-panel/buildings/stone-warehouse/stone-warehouse.component';
import { WallComponent } from './main-panel/buildings/wall/wall.component';
import { WoodFactoryComponent } from './main-panel/buildings/wood-factory/wood-factory.component';
import { WoodWarehouseComponent } from './main-panel/buildings/wood-warehouse/wood-warehouse.component';
 
import { MainPanelComponent} from './main-panel/main-panel/main-panel.component';
import { StatisticsComponent } from './statistics/statistics/statistics.component';
 
 
export const appRoutes: Routes = [
  { path: 'home', component: MainPanelComponent, canActivate : [AuthGuardService] },
  { path: 'login', component: LoginComponent},
  { path: 'CenterBuilding', component: CenterBuildingComponent, canActivate : [AuthGuardService] },
  { path: 'WoodWarehouse', component: WoodWarehouseComponent, canActivate : [AuthGuardService] },
  { path: 'WoodFactory', component: WoodFactoryComponent, canActivate : [AuthGuardService] },
  { path: 'StoneWarehouse', component: StoneWarehouseComponent, canActivate : [AuthGuardService] },
  { path: 'StoneMine', component: StoneMineComponent, canActivate : [AuthGuardService] },
  { path: 'CropWarehouse', component: CropWarehouseComponent, canActivate : [AuthGuardService] },
  { path: 'CropFarm', component: CropFarmComponent, canActivate : [AuthGuardService] },
  { path: 'Arsenal', component: ArsenalComponent, canActivate : [AuthGuardService] },
  { path: 'Quarters', component: QuartersComponent, canActivate : [AuthGuardService] },
  { path: 'Wall', component: WallComponent, canActivate : [AuthGuardService] },
  { path: 'Embassy', component: EmbassyComponent, canActivate : [AuthGuardService] },
  { path: 'Statistics', component: StatisticsComponent, canActivate : [AuthGuardService] },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
];