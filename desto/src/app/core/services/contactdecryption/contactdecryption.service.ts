import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ContactdecryptionService {

  private stringpref1 = 'mai';
  private stringpref2 = 'lto:';
  private contactRaw: string;

  constructor() {
    this.contactRaw = environment.contact;
    // console.log('raw:', this.contactRaw);
  }

  public resolvePrefix(key: string): string {
    if (key === 'hexhex') {
      return this.stringpref1 + this.stringpref2; // returns correct mail to string
    } else {
      return 'wrong';
    }
  }

  public decrypContact(key: string): string {
    let decryptedString = 'trolololo';

    if (key === 'TROLOLO') {
      decryptedString = this.contactRaw.replace(key, '@'); // returns correct mailaddress
      return decryptedString;
    } else {
      return decryptedString;
    }
  }
}
