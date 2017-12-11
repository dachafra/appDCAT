import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { UploadComponent } from './upload/upload.component';
import { InputRdfComponent } from './input-rdf/input-rdf.component';
@NgModule({
  declarations: [
    AppComponent,
    UploadComponent,
    InputRdfComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,  // <-Add HttpModule
    RouterModule.forRoot(
      [{path: 'upload' , component: UploadComponent },
      {path: 'input' , component: InputRdfComponent }
    ]),
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
