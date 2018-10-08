import { Component, ElementRef, OnInit } from '@angular/core';

import { canvasConst, preloadingConst, spriteConst } from './game-canvas.config';

@Component({
  selector: 'gt-game-canvas',
  templateUrl: './game-canvas.component.html',
  styleUrls: ['./game-canvas.component.scss']
})
export class GameCanvasComponent implements OnInit {
  ready = false;
  gameloop;
  facing;
  currX;
  currY;
  charX;
  charY;
  isMoving;
  charImage = new Image();
  preLoader: number;

  constructor(private el: ElementRef) { }

  ngOnInit() {
    this.setUpCanvas();
  }

  setUpCanvas() {
    const stage = this.el.nativeElement.querySelector('canvas');
    stage.width = canvasConst.width;
    stage.height = canvasConst.height;
    const ctx = stage.getContext('2d');
    ctx.fillStyle = 'grey';
    ctx.font = canvasConst.font;
    ctx.fillRect(0, 0, stage.width, stage.height);

    // Make Image
    this.charImage.onload = (() => { this.ready = true; });
    this.charImage.src = spriteConst.path;

    // Display Preloading
    ctx.fillRect(0, 0, stage.width, stage.height);
    ctx.fillStyle = '#000';
    ctx.fillText(preloadingConst.text, preloadingConst.textX, preloadingConst.textY);

    this.preLoader = window.setInterval(this.preloading, canvasConst.timePreFrame);
  }

  preloading() {
    if (this.ready) {
    clearInterval(this.preLoader);

    // Initialize game
    this.facing = 'E'; // N = North, E = East, S = South, W = West
    this.isMoving = false;

    // this.gameloop = setInterval(this.update, TIME_PER_FRAME);
    // document.addEventListener("keydown",keyDownHandler, false);
    // document.addEventListener("keyup",keyUpHandler, false);
    }
  }

}
