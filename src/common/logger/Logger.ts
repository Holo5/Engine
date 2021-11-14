import { ILogLevel, LogLevel } from './LogLevel';
import { Configuration } from '../../conf';

const consoleColor = require('@yaireo/console-colors');

export class Logger {
    private static ConsoleColorLogger = consoleColor();

    public static debug(...message: any): void {
        if (Configuration.global.debug) {
            this.log('DEBUG', LogLevel.DEBUG, message);
        }
    }

    public static info(...message: any): void {
        if (Configuration.global.debug) {
            this.log('INFO', LogLevel.INFO, message);
        }
    }

    public static warn(...message: any): void {
        if (Configuration.global.debug) {
            this.log('WARNING', LogLevel.WARN, message);
        }
    }

    public static error(...message: any): void {
        if (Configuration.global.debug) {
            this.log('ERROR', LogLevel.ERROR, message);
        }
    }

    private static log(level: any, loggerStyle: ILogLevel, ...messages: any): void {
        if (Configuration.global.debug) {
            // console.log(`${this.date} | ${level} | ${messages}`);
            this.ConsoleColorLogger[loggerStyle.backgroundColor][loggerStyle.textColor].log(`${this.date} | ${level} | ${messages}`);
        }
    }

    private static get date(): string {
        return new Date().toLocaleDateString('en-GB',
            {
                year: 'numeric',
                month: 'numeric',
                day: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
                second: 'numeric',
            });
    }
}
