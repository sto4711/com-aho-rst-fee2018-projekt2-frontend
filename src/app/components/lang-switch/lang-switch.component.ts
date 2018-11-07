import {Component} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {LanguageService} from '../../services/language/language.service';
import {LanguageDefinition} from '../../services/language/language-definition';

@Component({
  selector: 'app-lang-switch',
  templateUrl: './lang-switch.component.html',
  styleUrls: ['./lang-switch.component.scss']
})
export class LangSwitchComponent {
  public selectedLanguage = 'de';
  public languages = [new LanguageDefinition('de', 'Deutsch'), new LanguageDefinition('en', 'English')];
  public langSwitch: boolean;

  constructor(
    private translate: TranslateService,
    private languageService: LanguageService
   ) {
    translate.setDefaultLang(this.selectedLanguage);
    this.langSwitch = true;
  }

  public onLangChanged(langCode) {
    if (langCode !== this.selectedLanguage) {
      this.translate.use(langCode);
      this.selectedLanguage = langCode;

      for (let i = 0; i < this.languages.length; i++) {
        if (this.languages[i].code === langCode)  {
          this.languageService.sendLanguage(this.languages[i]);
          break;
        }
      }
      this.langSwitch = !this.langSwitch;
    }
  }


}
