import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LangService {
  private subject = new Subject<any>();

  public sendLanguage(lang: string) {
    this.subject.next({ lang: lang });
  }

  public clearLanguage() {
    this.subject.next();
  }

  public getLanguage(): Observable<any> {
    return this.subject.asObservable();
  }
}
