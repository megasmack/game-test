import { Component, HostListener, OnDestroy, OnInit, ViewChild } from '@angular/core';

import { SpriteComponent } from '../sprite/sprite.component';
import { Direction } from '../sprite/sprite.config';

@Component({
  selector: 'gt-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit, OnDestroy {
  @ViewChild(SpriteComponent) sprite: SpriteComponent;
  gameLoop: number;

  @HostListener('document:keydown', ['$event'])
    onKeydownHandler(event: KeyboardEvent) {
      const keyPressed = String.fromCharCode(event.keyCode);
      if (keyPressed === 'W') {
        this.sprite.facing = 'n';
        this.sprite.isMoving = true;
      } else if (keyPressed === 'D') {
        this.sprite.facing = 'e';
        this.sprite.isMoving = true;
      } else if (keyPressed === 'S') {
        this.sprite.facing = 's';
        this.sprite.isMoving = true;
      } else if (keyPressed === 'A') {
        this.sprite.facing = 'w';
        this.sprite.isMoving = true;
      }
      this.sprite.facingChange.emit(this.sprite.facing);
    }

    @HostListener('document:keyup', ['$event'])
      onKeyupHandler(event: KeyboardEvent) {
        const keyPressed = String.fromCharCode(event.keyCode);
        if ((keyPressed === 'W') || (keyPressed === 'A') ||
        (keyPressed === 'S') || (keyPressed === 'D')) {
          this.sprite.isMoving = false;
        }
      }

  constructor() { }

  ngOnInit() {
    this.gameLoop = window.setInterval(this.sprite.updateSprite, this.sprite.timePerFrame);
  }

  ngOnDestroy() {
    window.clearInterval(this.gameLoop);
  }
}
