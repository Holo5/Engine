import { IDisposable } from './IDisposable';

export abstract class Disposable implements IDisposable {
    disposed = false;

    abstract onDispose(): void;

    public dispose() {
        this.disposed = true;
        this.onDispose();
    }
}
