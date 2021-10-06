import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {HeaderComponent} from './components/header/header.component';
import {ScoreComponent} from './components/score/score.component';
import {OptionGameComponent} from './components/option-game/option-game.component';
import {CommonModule} from "@angular/common";
import {RulesDialogComponent} from './components/rules-dialog/rules-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ScoreComponent,
    OptionGameComponent,
    RulesDialogComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
