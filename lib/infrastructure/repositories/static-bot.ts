import { BotDomainService } from "../../domain/models/bot-message";
import { IBotRepository } from "../../domain/repositories/bot-repo";

export class StaticBotRepository implements IBotRepository {
    async getBotResponse(userInput: string): Promise<string> {
        // We simulate a network delay for better UX (asynchronous reply)
        return new Promise((resolve) => {
            setTimeout(() => {
                const response = BotDomainService.getResponse(userInput);
                resolve(response);
            }, 800);
        });
    }
}
