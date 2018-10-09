import { Component, ElementRef, OnDestroy, OnInit } from '@angular/core';

import { CANVAS_CONST, PRELOADING_CONST, SPRITE_CONST } from './game-canvas.config';

@Component({
  selector: 'gt-game-canvas',
  templateUrl: './game-canvas.component.html',
  styleUrls: ['./game-canvas.component.scss']
})
export class GameCanvasComponent implements OnInit, OnDestroy {
  ready = false;
  gameloop: number;
  facing: 'N' | 'E' | 'S' | 'W';
  currX: number;
  currY: number;
  charX: number;
  charY: number;
  isMoving: boolean;
  charImage = new Image();
  preLoader: number;

  constructor(private el: ElementRef) { }

  ngOnInit() {
    this.setUpCanvas();
  }

  ngOnDestroy() {
    window.clearInterval(this.preLoader);
  }

  setUpCanvas() {
    const stage = this.el.nativeElement.querySelector('canvas');
    stage.width = CANVAS_CONST.width;
    stage.height = CANVAS_CONST.height;
    const ctx = stage.getContext('2d');
    ctx.fillStyle = 'grey';
    ctx.font = CANVAS_CONST.font;
    ctx.fillRect(0, 0, stage.width, stage.height);

    // Make Image
    this.charImage.onload = (() => { this.ready = true; });
    this.charImage.src = SPRITE_CONST.path;

    // Display Preloading
    ctx.fillRect(0, 0, stage.width, stage.height);
    ctx.fillStyle = '#000';
    ctx.fillText(PRELOADING_CONST.text, PRELOADING_CONST.textX, PRELOADING_CONST.textY);

    this.preLoader = window.setInterval(this.preloading, CANVAS_CONST.timePreFrame);
  }

  preloading() {
    if (this.ready) {
      window.clearInterval(this.preLoader);

    // Initialize game
    this.facing = 'E'; // N = North, E = East, S = South, W = West
    this.isMoving = false;

    // this.gameloop = window.setInterval(this.update, TIME_PER_FRAME);
    // document.addEventListener("keydown",keyDownHandler, false);
    // document.addEventListener("keyup",keyUpHandler, false);
    }
  }

}
