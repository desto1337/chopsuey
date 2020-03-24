import { Component, OnInit } from '@angular/core';
import { ContactdecryptionService } from '../services/contactdecryption/contactdecryption.service';
import { Title } from '@angular/platform-browser';
import { BasicAnimations } from 'src/app/animations/basicanimations';

@Component({
  selector: 'app-privacypolicy',
  templateUrl: './privacypolicy.component.html',
  styleUrls: ['./privacypolicy.component.scss'],
  animations: [
    BasicAnimations.fadeOnEnter
  ]
})
export class PrivacypolicyComponent implements OnInit {

  private contact: string;

  constructor(private contactDescryptionService: ContactdecryptionService, private titleService: Title) { }

  ngOnInit() {
    this.titleService.setTitle('Dennis Stoklosa | Datenschutzerklärung');

    const encrypted = this.contactDescryptionService.decrypContact('TROLOLO');
    this.contact = 'Email: ' + encrypted;
  }

}
