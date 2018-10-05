import { Component, HostListener, OnInit, ViewChild } from '@angular/core';

import { SpriteComponent } from '../sprite/sprite.component';
import { Direction } from '../sprite/sprite.config';

@Component({
  selector: 'gt-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit {
  @ViewChild(SpriteComponent) sprite: SpriteComponent;

  @HostListener('document:keydown', ['$event'])
    onKeydownHandler(event: KeyboardEvent) {
      const keyPressed = String.fromCharCode(event.keyCode);
      if (keyPressed === 'W') {
        this.sprite.facing = 'n';
        // isMoving = true;
      } else if (keyPressed === 'D') {
        this.sprite.facing = 'e';
        // isMoving = true;
      } else if (keyPressed === 'S') {
        this.sprite.facing = 's';
        // isMoving = true;
      } else if (keyPressed === 'A') {
        this.sprite.facing = 'w';
        // isMoving = true;
      }
      this.sprite.facingChange.emit(this.sprite.facing);
    }

  constructor() { }

  ngOnInit() {
  }

}
