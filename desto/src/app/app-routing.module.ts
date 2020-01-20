import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LegalsComponent } from './core/legals/legals.component';
import { DashboardComponent } from './core/dashboard/dashboard.component';
import { MycareerComponent } from './modules/mycareer/mycareer.component';
import { PrivacypolicyComponent } from './core/privacypolicy/privacypolicy.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent},
  { path: 'legals', component: LegalsComponent},
  { path: 'privacy', component: PrivacypolicyComponent},
  { path: 'examples', component: MycareerComponent} // TO DO remove, just tests
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
