export class Tags {
    public tags: string[];

    constructor() {
        this.tags = [];
    }

    public append(tag: string) {
        this.tags.push(tag);
    }

    public delete(tag: string) {
        this.tags = this.tags.filter((currentTag: string) => currentTag !== tag);
    }
}
