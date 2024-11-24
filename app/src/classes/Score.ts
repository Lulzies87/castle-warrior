export class Score {
    private score: number;

    constructor() {
        this.score = 0;
    }

    public addPoints(points: number): void {
        this.score += points;
    }

    public getScore(): number {
        return this.score;
    }

    public reset(): void {
        this.score = 0;
    }
}