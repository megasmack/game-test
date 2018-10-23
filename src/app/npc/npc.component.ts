import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'gt-npc',
  templateUrl: './npc.component.html',
  styleUrls: ['./npc.component.scss']
})
export class NpcComponent implements OnInit {

  script = {
    steps: {
      step: {
        facing: 'n',
        move: 300,
        delay: 3
      }
    }
  };

  constructor() { }

  ngOnInit() {
  }

}
