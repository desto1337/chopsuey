import { Component, OnInit } from '@angular/core';
import { ContactdecryptionService } from '../services/contactdecryption/contactdecryption.service';

@Component({
  selector: 'app-privacypolicy',
  templateUrl: './privacypolicy.component.html',
  styleUrls: ['./privacypolicy.component.scss']
})
export class PrivacypolicyComponent implements OnInit {

  private contact: string;

  constructor(private contactDescryptionService: ContactdecryptionService) { }

  ngOnInit() {
    const encrypted = this.contactDescryptionService.decrypContact('TROLOLO');
    this.contact = 'Email: ' + encrypted;
  }

}
