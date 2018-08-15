import { Injectable } from '@angular/core';
import {Token} from "../login/token";
import {HttpClient} from "../../../../node_modules/@angular/common/http";
import {tokenize} from "../../../../node_modules/@angular/compiler/src/ml_parser/lexer";

@Injectable({
  providedIn: 'root'
})

export class ClientContextService {

  private token: Token = {value : ""};

  constructor() {
  }

  setToken(token: Token){
    this.token = token;
  }

  getToken()  {
    return this.token;
  }
}
