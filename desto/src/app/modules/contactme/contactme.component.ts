import { Component, OnInit } from '@angular/core';
import { ContactdecryptionService } from 'src/app/core/services/contactdecryption/contactdecryption.service';

@Component({
  selector: 'app-contactme',
  templateUrl: './contactme.component.html',
  styleUrls: ['./contactme.component.scss']
})
export class ContactmeComponent implements OnInit {

  private prefix: string; // prefix
  private contact: string; // contactaddress
  private options: string;
  private contactname: string;
  private subject = 'Feedback';
  private message: string;
  private messageHtml: any;

    constructor(private contactDecryptionService: ContactdecryptionService) { }

    ngOnInit() {
      this.contact = this.contactDecryptionService.decrypContact('TROLOLO');

      if (this.contactname || this.subject || this.message) {

        this.options = '?subject=' + this.subject; // subject ist immer ausgewählt

        if (this.message) {
          this.options = this.options + '&body=' + this.message;
        }

      }

      // Initialize Prefix
      this.prefix = this.contactDecryptionService.resolvePrefix('hexhex');

      console.log('Initiale Mail', this.contact);
      console.log('Initialer Prefix', this.prefix);
    }

    updateMailtoString() {

      if (this.contactname || this.subject || this.message) {
        this.options = '?subject=' + this.subject; // subject ist immer ausgewählt

        if (this.message) {
          this.options = this.options + '&body=' + this.message;
        }

      }
    }
  }
