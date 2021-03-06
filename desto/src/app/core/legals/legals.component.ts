import { Component, OnInit } from '@angular/core';
import { ContactdecryptionService } from '../services/contactdecryption/contactdecryption.service';
import { Title } from '@angular/platform-browser';
import { BasicAnimations } from 'src/app/animations/basicanimations';

@Component({
  selector: 'app-legals',
  templateUrl: './legals.component.html',
  styleUrls: ['./legals.component.scss'],
  animations: [
    BasicAnimations.fadeOnEnter
  ]
})
export class LegalsComponent implements OnInit {

  private contact: string;

  constructor(private contactDescryptionService: ContactdecryptionService, private titleService: Title) { }

  ngOnInit() {
    this.titleService.setTitle('Dennis Stoklosa | Impressum');

    const encrypted = this.contactDescryptionService.decrypContact('TROLOLO');
    this.contact = 'Email: ' + encrypted;
  }

}
