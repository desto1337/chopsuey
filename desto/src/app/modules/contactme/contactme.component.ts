import { Component, OnInit } from '@angular/core';
// import { faCoffee, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { faStackOverflow, faGithubAlt, faXing, faLinkedinIn, IconDefinition } from '@fortawesome/free-brands-svg-icons';
import { ContactdecryptionService } from 'src/app/core/services/contactdecryption/contactdecryption.service';
import { environment } from 'src/environments/environment';
import { Title } from '@angular/platform-browser';

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
  private messageFormatted: any;

    constructor(private contactDecryptionService: ContactdecryptionService, private titleService: Title) { }

    ngOnInit() {
      this.titleService.setTitle('Dennis Stoklosa | Kontakt');

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
          this.messageFormatted = this.replaceLineBreaks(this.message);
          this.options = this.options + '&body=' + this.messageFormatted;
        }

      }
    }

    replaceLineBreaks(rawMessage: string): string {

      let formattedMessage = rawMessage;

      while (formattedMessage.indexOf('\n') > 0) {
        formattedMessage = formattedMessage.replace('\n', '%0D%0A');
        formattedMessage = formattedMessage.replace('<s', 'ACHTUNG-S-TAG'); // just to be sure
        formattedMessage = formattedMessage.replace('script', 'ACHTUNG-S-TAG'); // just to be sure
      }

      return formattedMessage;
    }
  }
