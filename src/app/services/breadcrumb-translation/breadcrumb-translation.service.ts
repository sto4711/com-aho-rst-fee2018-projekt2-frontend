import { Injectable } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {BreadcrumbPath} from '../../components/breadcrumb/breadcrumb-path';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BreadcrumbTranslationService {
  public firstParam: string;
  public breadcrumbPath: BreadcrumbPath[] = [];

  constructor(
    private translate: TranslateService
  ) {}

  public get() {
   for (let i = 0; i < this.breadcrumbPath.length; i++ ) {
      this.translate.get(this.breadcrumbPath[i].breadcrumb).subscribe(translated => {
         this.breadcrumbPath[i].breadcrumbTranslated = translated;
        }
      );
    }
  }
}
