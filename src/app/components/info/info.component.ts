import { Component, OnInit } from '@angular/core';
import { InfoService } from 'src/app/services/info/info.service';


@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent implements OnInit {

  constructor(public infoService: InfoService) {}



  ngOnInit() {
  }

}
