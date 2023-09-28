import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; // Importa FormsModule
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navigation/navbar/navbar.component';
import { FooterComponent } from './navigation/footer/footer.component';
import { LandingComponent } from './pages/landing/landing.component';
import { ShareIdeasComponent } from './pages/share-ideas/share-ideas.component';
import { LoginComponent } from './auth/login/login.component';
import { CardComponent } from './pages/card/card.component';
import { ContactFormComponent } from './pages/contact-form/contact-form.component';
import { LocationCardComponent } from './pages/location-card/location-card.component';
import { RegisterComponent } from './auth/register/register.component';
import { DatePipe } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    LandingComponent,
    ShareIdeasComponent,
    LoginComponent,
    CardComponent,
    ContactFormComponent,
    LocationCardComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
