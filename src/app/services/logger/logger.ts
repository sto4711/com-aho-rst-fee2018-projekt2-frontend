import {environment} from "../../../environments/environment";
/*
  In production mode nothing will be logged
 */
export class Logger {

  public static consoleLog(logger: string, methodName: string, message: string) {
    if(!environment.production)  {
      console.log(message);
    }
  }

  public static consoleError(logger: string, methodName: string, message: string) {
    if(!environment.production)  {
      console.error(message);
    }
  }


  private static formatMessage(message : String)  {

  }



}
