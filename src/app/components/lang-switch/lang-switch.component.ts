import {Component} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {LangDef} from './lang-def';
import {BreadcrumbTranslationService} from '../../services/breadcrumb-translation/breadcrumb-translation.service';
import {LangService} from '../../services/lang-service/lang.service';

@Component({
  selector: 'app-lang-switch',
  templateUrl: './lang-switch.component.html',
  styleUrls: ['./lang-switch.component.scss']
})
export class LangSwitchComponent {
  public selectedLanguage = 'de';
  public languages = [new LangDef('de', 'Deutsch'), new LangDef('en', 'English')];
  public langSwitch: boolean;

  constructor(
    private translate: TranslateService
    , private breadcrumbTranslationService: BreadcrumbTranslationService
    , private langService: LangService
   ) {
    translate.setDefaultLang(this.selectedLanguage);
    this.langSwitch = true;

  }

  public onLangChanged(langCode) {
    if (langCode !== this.selectedLanguage) {
      this.translate.use(langCode);
      this.selectedLanguage = langCode;
      this.breadcrumbTranslationService.translate();

      for (let i = 0; i < this.languages.length;i++) {
        if(this.languages[i].code === langCode)  {
          console.log('hab ihn ' + this.languages[i].name);
          this.langService.sendLanguage(this.languages[i]);
          break;
        }

      }
      this.langSwitch = !this.langSwitch;
    }
  }


}
