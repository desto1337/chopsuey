import { Component, OnInit } from '@angular/core';
import { BasicAnimations } from 'src/app/animations/basicanimations';

@Component({
  selector: 'app-notavailable',
  templateUrl: './notavailable.component.html',
  styleUrls: ['./notavailable.component.scss'],
  animations: [
    BasicAnimations.flyInOnEnter1
  ]
})
export class NotavailableComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
