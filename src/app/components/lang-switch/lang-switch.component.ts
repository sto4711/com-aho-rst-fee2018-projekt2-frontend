import {Component, OnInit} from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import {LangDef} from "./lang-def";

@Component({
  selector: 'app-lang-switch',
  templateUrl: './lang-switch.component.html',
  styleUrls: ['./lang-switch.component.scss']
})
export class LangSwitchComponent {
  public selectedLanguage = 'de';
  public languages = [new LangDef('de','Deutsch'), new LangDef('en','English')];

  constructor(private translate: TranslateService) {
    translate.setDefaultLang(this.selectedLanguage);
  }

  public onLangChanged(langCode) {
    if(langCode !== this.selectedLanguage)  {
      this.translate.use(langCode);
      this.selectedLanguage = langCode;
    }
  }


}
