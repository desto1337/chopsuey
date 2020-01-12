import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'; // <-- NgModel lives here

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
    FooterComponent
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
