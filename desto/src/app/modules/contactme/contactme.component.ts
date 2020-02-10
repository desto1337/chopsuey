import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contactme',
  templateUrl: './contactme.component.html',
  styleUrls: ['./contactme.component.scss']
})
export class ContactmeComponent implements OnInit {

  private mailtoString = 'contact@dennis-stoklosa.de';
  private contactname: string;
  private subject = 'Feedback';
  private message: string;
  private messageHtml: any;

    constructor() { }

    ngOnInit() {
      if (this.contactname || this.subject || this.message) {

        this.mailtoString = 'contact@dennis-stoklosa.de?';
        this.mailtoString = 'contact@dennis-stoklosa.de?subject=' + this.subject; // subject ist immer ausgewählt

        if (this.message) {
          this.mailtoString = this.mailtoString + '&body=' + this.message;
        }

      } else {
        this.mailtoString = 'contact@dennis-stoklosa.de';
      }
    }

    updateMailtoString() {

      if (this.contactname || this.subject || this.message) {

        this.mailtoString = 'contact@dennis-stoklosa.de?';
        this.mailtoString = 'contact@dennis-stoklosa.de?subject=' + this.subject; // subject ist immer ausgewählt

        if (this.message) {
          this.mailtoString = this.mailtoString + '&body=' + this.message;
        }

      } else {
        this.mailtoString = 'contact@dennis-stoklosa.de';
      }
    }
  }
