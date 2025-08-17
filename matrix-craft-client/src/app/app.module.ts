import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { InfiniteGridComponent } from './components/infinite-grid/infinite-grid.component';

@NgModule({
  declarations: [
    AppComponent,
    InfiniteGridComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
