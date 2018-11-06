import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import {LangDef} from "../../components/lang-switch/lang-def";

@Injectable({ providedIn: 'root' })
export class LangService {
  private subject = new Subject<LangDef>();

  public sendLanguage(langDef: LangDef) {
    this.subject.next(langDef);
  }

  public clearLanguage() {
    this.subject.next();
  }

  public getLanguage(): Observable<LangDef> {
    return this.subject.asObservable();
  }
}
