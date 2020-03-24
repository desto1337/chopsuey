import { Component, OnInit } from '@angular/core';
import { faStackOverflow, faGithubAlt, faXing, faLinkedinIn, IconDefinition } from '@fortawesome/free-brands-svg-icons';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  public faStackOverflow: IconDefinition = faStackOverflow;
  public faGithubAlt: IconDefinition = faGithubAlt;
  public faXing: IconDefinition = faXing;
  public faLinkedinIn: IconDefinition = faLinkedinIn;

  private currentYear: number;
  private urlXing: string;
  private urlLinkedIn: string;
  private urlGithub: string;
  private urlStackoverflow: string;

  constructor() { }

  ngOnInit() {
    this.currentYear = new Date().getFullYear();
    this.urlXing = environment.urlXing;
    this.urlLinkedIn = environment.urlLinkedIn;
    this.urlGithub = environment.urlGithub;
    this.urlStackoverflow = environment.urlStackoverflow;
  }

}
