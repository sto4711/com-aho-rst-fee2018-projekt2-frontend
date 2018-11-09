import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import {LanguageDefinition} from './language-definition';

@Injectable({ providedIn: 'root' })
export class LanguageService {
  private subject = new Subject<LanguageDefinition>();

  public sendLanguage(langDef: LanguageDefinition) {
    this.subject.next(langDef);
  }

  public getLanguage(): Observable<LanguageDefinition> {
    return this.subject.asObservable();
  }
}
