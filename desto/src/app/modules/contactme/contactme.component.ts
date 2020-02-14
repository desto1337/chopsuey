import { Component, OnInit } from '@angular/core';
// import { faCoffee, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { faStackOverflow, faGithubAlt, faXing, faLinkedinIn, IconDefinition } from '@fortawesome/free-brands-svg-icons';
import { ContactdecryptionService } from 'src/app/core/services/contactdecryption/contactdecryption.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-contactme',
  templateUrl: './contactme.component.html',
  styleUrls: ['./contactme.component.scss']
})
export class ContactmeComponent implements OnInit {

  private xingLink: string;
  private linkedinLink: string;
  private githubLink: string;
  private stackoverflowLink: string;

  public faStackOverflow: IconDefinition = faStackOverflow;
  public faGithubAlt: IconDefinition = faGithubAlt;
  public faXing: IconDefinition = faXing;
  public faLinkedinIn: IconDefinition = faLinkedinIn;

  private prefix: string; // prefix
  private contact: string; // contactaddress
  private options: string;
  private subject = 'Feedback';
  private message: string;
  private messageHtml: any;

    constructor(private contactDecryptionService: ContactdecryptionService) { }

    ngOnInit() {
      this.xingLink = environment.urlXing;
      this.linkedinLink = environment.urlLinkedIn;
      this.githubLink = environment.urlGithub;
      this.stackoverflowLink = environment.urlStackoverflow;

      this.contact = this.contactDecryptionService.decrypContact('TROLOLO');

      // Initialize Prefix
      this.prefix = this.contactDecryptionService.resolvePrefix('hexhex');

      console.log('Initiale Mail', this.contact);
      console.log('Initialer Prefix', this.prefix);

      this.updateMailtoString();
    }

    updateMailtoString() {

      if (this.subject || this.message) {
        this.options = '?subject=' + this.subject; // subject ist immer ausgewählt

        if (this.message) {
          this.options = this.options + '&body=' + this.message;
        }

      }
    }
  }
