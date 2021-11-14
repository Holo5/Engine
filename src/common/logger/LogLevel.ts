export interface ILogLevel {
    level: number,
    textColor: string,
    backgroundColor: string
}

export class LogLevel {
    public static DEBUG: ILogLevel = { level: 0, textColor: 'black', backgroundColor: 'bgGreen' };
    public static INFO: ILogLevel = { level: 1, textColor: 'white', backgroundColor: 'bgBlue' };
    public static WARN: ILogLevel = { level: 2, textColor: 'black', backgroundColor: 'bgYellow' };
    public static ERROR: ILogLevel = { level: 3, textColor: 'white', backgroundColor: 'bgRed' };
}
