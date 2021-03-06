import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LegalsComponent } from './core/legals/legals.component';
import { DashboardComponent } from './core/dashboard/dashboard.component';
import { PrivacypolicyComponent } from './core/privacypolicy/privacypolicy.component';
import { ContactmeComponent } from './modules/contactme/contactme.component';
import { MyprojectsComponent } from './modules/myprojects/myprojects.component';
import { MyskillsComponent } from './modules/myskills/myskills.component';
import { PersonComponent } from './core/person/person.component';
import { NotavailableComponent } from './modules/notavailable/notavailable.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent},
  { path: 'person', component: PersonComponent},
  { path: 'skills', component: MyskillsComponent},
  { path: 'projects', component: MyprojectsComponent},
  { path: 'contact', component: ContactmeComponent},
  { path: 'legals', component: LegalsComponent},
  { path: 'privacy', component: PrivacypolicyComponent},
  { path: 'notavailable', component: NotavailableComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'top', useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
