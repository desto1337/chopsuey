import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contactme',
  templateUrl: './contactme.component.html',
  styleUrls: ['./contactme.component.scss']
})
export class ContactmeComponent implements OnInit {

  private disabledGenerateEmail = true;
  private contactname: string;
  private subject: string;
  private message: string;

    constructor() { }

    ngOnInit() {}
  }
