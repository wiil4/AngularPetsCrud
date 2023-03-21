import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

//Modules
import { SharedModule } from './shared/shared.module';

//Components
import { AddEditPetComponent } from './components/add-edit-pet/add-edit-pet.component';
import { PetListComponent } from './components/pet-list/pet-list.component';
import { ShowPetComponent } from './components/show-pet/show-pet.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  declarations: [
    AppComponent,
    AddEditPetComponent,
    PetListComponent,
    ShowPetComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,  
    SharedModule  
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
