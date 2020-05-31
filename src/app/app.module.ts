import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { MatToolbarModule } from '@angular/material/toolbar';
import { HeroesModule } from './heroes/heroes.module';
import { HomeComponent } from './home/home.component';
import { ComicsModule } from './comics/comics.module';

@NgModule({
  declarations: [AppComponent, HomeComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    HttpClientModule,
    HeroesModule,
    ComicsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
