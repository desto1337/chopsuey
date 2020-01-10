import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'; // <-- NgModel lives here

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { OpeningComponent } from './modules/components/opening/opening.component';
import { AboutmeComponent } from './modules/components/aboutme/aboutme.component';
import { MyskillsComponent } from './modules/components/myskills/myskills.component';
import { MypassionComponent } from './modules/components/mypassion/mypassion.component';
import { MyprojectsComponent } from './modules/components/myprojects/myprojects.component';
import { MycareerComponent } from './modules/components/mycareer/mycareer.component';
import { ContactmeComponent } from './modules/components/contactme/contactme.component';

@NgModule({
  declarations: [
    AppComponent,
    OpeningComponent,
    AboutmeComponent,
    MyskillsComponent,
    MypassionComponent,
    MyprojectsComponent,
    MycareerComponent,
    ContactmeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
