import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import {MatSnackBar} from '@angular/material';


@Injectable({ providedIn: 'root' })
export class MessageService {
  private subject = new Subject<any>();
  private snackBar: MatSnackBar;

  sendMessage(message: string) {
   this.subject.next({ text: message });

  }

  clearMessage() {
    this.subject.next();
  }

  getMessage(): Observable<any> {
    return this.subject.asObservable();
  }
}
