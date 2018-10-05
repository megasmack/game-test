import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnDestroy, Output } from '@angular/core';
import { Subscription } from 'rxjs';

import { Direction } from './sprite.config';

@Component({
  selector: 'gt-sprite',
  templateUrl: './sprite.component.html',
  styleUrls: ['./sprite.component.scss']
})
export class SpriteComponent implements AfterViewInit, OnDestroy {
  // Constants
  path = '../assets/spritesheet2.png';
  width = 72;
  height = 96;
  startX = 200;
  startY = 200;
  speed = 5;
  spriteX = 0;
  spriteNorthY = 0;
  spriteEastY = 96;
  spriteSouthY = 192;
  spriteWestY = 288;
  spriteWidth = 216;

  // Vars
  ready = false;
  gameloop;
  currX;
  currY;
  charX;
  charY;
  isMoving;

  spriteEl: HTMLElement;

  @Input() facing: Direction = 'e';
  @Output() facingChange: EventEmitter<Direction> = new EventEmitter<Direction>();

  facing$: Subscription;

  constructor(private el: ElementRef) {
    this.setupSprite = this.setupSprite.bind(this);
  }

  ngAfterViewInit() {
    this.loadImage();
  }

  ngOnDestroy() {
    this.facing$.unsubscribe();
  }

  loadImage() {
    const image = new Image();
    image.onload = this.setupSprite;
    image.src = this.path;
  }

  setupSprite() {
    this.spriteEl = this.el.nativeElement.querySelector('.sprite');
    this.spriteEl.style.width = `${this.width}px`;
    this.spriteEl.style.height = `${this.height}px`;
    this.spriteEl.style.backgroundImage = `url(${this.path})`;
    this.spriteEl.style.backgroundPositionX = `${this.spriteX}px`;
    this.spriteEl.style.backgroundPositionY = `${this.setFacing(this.facing)}px`;
    this.subscribeFacing();
  }

  setFacing(facing) {
    let y;
    if (facing === 'n') {
      y = this.spriteNorthY;
    } else if (facing === 'e') {
      y = this.spriteEastY;
    } else if (facing === 's') {
      y = this.spriteSouthY;
    } else if (facing === 'w') {
      y = this.spriteWestY;
    }
    return -y;
  }

  subscribeFacing() {
    this.facing$ = this.facingChange.subscribe((facing) => {
      const facingPx = this.setFacing(facing);
      this.spriteEl.style.backgroundPositionY = `${facingPx}px`;
    });
  }

}
