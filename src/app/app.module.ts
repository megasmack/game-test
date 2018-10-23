import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SpriteComponent } from './sprite/sprite.component';
import { StageComponent } from './stage/stage.component';
import { PlayerComponent } from './player/player.component';
import { NpcComponent } from './npc/npc.component';

@NgModule({
  declarations: [
    AppComponent,
    StageComponent,
    SpriteComponent,
    PlayerComponent,
    NpcComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
