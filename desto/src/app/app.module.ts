import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'; // <-- NgModel lives here
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgApexchartsModule } from 'ng-apexcharts';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { OpeningComponent } from './modules/opening/opening.component';
import { AboutmeComponent } from './modules/aboutme/aboutme.component';
import { MyskillsComponent } from './modules/myskills/myskills.component';
import { MypassionComponent } from './modules/mypassion/mypassion.component';
import { MyprojectsComponent } from './modules/myprojects/myprojects.component';
import { MycareerComponent } from './modules/mycareer/mycareer.component';
import { ContactmeComponent } from './modules/contactme/contactme.component';
import { HeaderComponent } from './core/header/header.component';
import { FooterComponent } from './core/footer/footer.component';
import { LegalsComponent } from './core/legals/legals.component';
import { PrivacypolicyComponent } from './core/privacypolicy/privacypolicy.component';
import { DashboardComponent } from './core/dashboard/dashboard.component';
import { PersonComponent } from './core/person/person.component';
import { NotavailableComponent } from './modules/notavailable/notavailable.component';
import { ContentfulService } from './core/services/contentful/contentful.service';
import { OnviewportDirective } from './directives/onviewport/onviewport.directive';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    OpeningComponent,
    AboutmeComponent,
    MyskillsComponent,
    MypassionComponent,
    MyprojectsComponent,
    MycareerComponent,
    ContactmeComponent,
    HeaderComponent,
    FooterComponent,
    LegalsComponent,
    PrivacypolicyComponent,
    DashboardComponent,
    PersonComponent,
    OnviewportDirective,
    NotavailableComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    AppRoutingModule,
    FontAwesomeModule,
    NgApexchartsModule
  ],
  providers: [
    ContentfulService,
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
