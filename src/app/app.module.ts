import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { FileUploadModule } from 'ng2-file-upload';
import {LocationStrategy, HashLocationStrategy} from '@angular/common';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from './material.module';

import { AppComponent } from './app.component';
import { Home } from '../pages/home/home';
import { Prawn } from '../pages/prawn/prawn';
import { Ambapo } from '../pages/ambapo/ambapo';

const appRoutes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: Home, pathMatch: 'full' },
  { path: 'prawn', component: Prawn, pathMatch: 'full' },
  { path: 'ambapo', component: Ambapo, pathMatch: 'full' }
];

@NgModule({
  declarations: [
    AppComponent,
    Home,
    Prawn,
    Ambapo
  ],
  imports: [
    FileUploadModule,
    FlexLayoutModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterialModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
