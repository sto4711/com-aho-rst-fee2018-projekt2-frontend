import {environment} from '../../../environments/environment';
import dateformat from 'dateformat';

/*
  In production mode nothing will be logged
 */
export class Logger {

  public static consoleLog(logger: string, methodName: string, message: string): void {
    if (!environment.production)  {
      console.log(Logger.formatMessage(logger, methodName, message));
    }
  }

  public static consoleError(logger: string, methodName: string, message: string): void {
    if (!environment.production)  {
      console.error(Logger.formatMessage(logger, methodName, message));
    }
  }

  private static formatMessage(logger: string, methodName: string, message: string): string  {
    const formatted: string = logger + '.' + methodName + '()';
    return dateformat(new Date(), 'yy.mm.dd h:MM:ss ') + formatted.padEnd(45) + message;
  }


}
