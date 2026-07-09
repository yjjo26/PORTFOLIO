export interface IBotRepository {
    getBotResponse(userInput: string): Promise<string>;
}
