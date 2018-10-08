import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnDestroy, Output } from '@angular/core';
import { Subscription } from 'rxjs';


import * as Rematrix from 'rematrix';
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
  currX = 0;
  currY = 0;
  charX = 0;
  charY = 0;
  isMoving = false;
  timePerFrame = 60;

  spriteEl: HTMLElement;

  @Input() facing: Direction = 'e';
  @Output() facingChange: EventEmitter<Direction> = new EventEmitter<Direction>();

  facing$: Subscription;

  constructor(private el: ElementRef) {
    this.setupSprite = this.setupSprite.bind(this);
    this.updateSprite = this.updateSprite.bind(this);
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
    // this.spriteEl.style.backgroundPositionX = `${this.spriteX}px`;
    // this.spriteEl.style.backgroundPositionY = `${this.setFacing(this.facing)}px`;
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

  updateSprite() {
    if (this.isMoving) {
      if (this.facing === 'n') {
        this.charY -= this.speed;
        this.currY = this.spriteNorthY;
      } else if (this.facing === 'e') {
        this.charX += this.speed;
        this.currY = this.spriteEastY;
      } else if (this.facing === 's') {
        this.charY += this.speed;
        this.currY = this.spriteSouthY;
      } else if (this.facing === 'w') {
        this.charX -= this.speed;
        this.currY = this.spriteWestY;
      }

      this.currX += this.width;

      if (this.currX >= this.width) {
        this.currX = 0;
      }

      const coordinates = Rematrix.translate(this.charX, this.charY);
      const matrix = [coordinates].reduce(Rematrix.multiply);
      this.spriteEl.style.transform = Rematrix.toString(matrix);
      this.spriteEl.style.backgroundPositionX = `-${this.currX}px`;
      this.spriteEl.style.backgroundPositionY = `-${this.currY}px`;
    }
  }
}
