import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NewComponent } from './new/new.component';
import { ListComponent } from './list/list.component';
import { EditComponent } from './edit/edit.component';
import { PlayComponent } from './play/play.component';
import { CoreModule } from './core/core.module';

@NgModule({
  declarations: [AppComponent, NewComponent, ListComponent, EditComponent, PlayComponent],
  imports: [BrowserModule, AppRoutingModule, FormsModule, CoreModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
