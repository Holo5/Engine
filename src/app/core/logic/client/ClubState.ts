export class ClubState {
    public active: boolean;
    public daysRemaining: number;
    public monthsRemaining: number;

    constructor(
        active: boolean,
        daysRemaining: number,
        monthsRemaining: number,
    ) {
        this.active = active;
        this.daysRemaining = daysRemaining;
        this.monthsRemaining = monthsRemaining;
    }
}
