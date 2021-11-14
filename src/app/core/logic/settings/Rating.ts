export class Rating {
    public score: number;
    public userCanRate: boolean;

    constructor(score: number, userCanRate: boolean) {
        this.score = score;
        this.userCanRate = userCanRate;
    }

    public vote() {
        this.score = this.userCanRate ? this.score + 1 : this.score - 1;
        this.userCanRate = !this.userCanRate;

        // TODO: Rate system
    }
}
