import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LangService {
  private subject = new Subject<any>();

  sendLanguage(lang: string) {
    this.subject.next({ lang: lang });
  }

  clearLanguage() {
    this.subject.next();
  }

  getLanguage(): Observable<any> {
    return this.subject.asObservable();
  }
}
