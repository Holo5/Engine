export interface ITween {
    complete: boolean;

    update(now: number): void;
}
