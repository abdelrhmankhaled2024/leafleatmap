import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MapComponent } from './map/map.component';
import { HttpClientModule } from '@angular/common/http';
import {MatChipsModule} from '@angular/material/chips';
import { AfiComponent } from './afi/afi.component';

@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    AfiComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,HttpClientModule,MatChipsModule
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
