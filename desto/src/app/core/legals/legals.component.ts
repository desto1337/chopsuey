import { Component, OnInit } from '@angular/core';
import { ContactdecryptionService } from '../services/contactdecryption/contactdecryption.service';

@Component({
  selector: 'app-legals',
  templateUrl: './legals.component.html',
  styleUrls: ['./legals.component.scss']
})
export class LegalsComponent implements OnInit {

  private contact: string;

  constructor(private contactDescryptionService: ContactdecryptionService) { }

  ngOnInit() {
    const encrypted = this.contactDescryptionService.decrypContact('TROLOLO');
    this.contact = 'Email: ' + encrypted;
  }

}
