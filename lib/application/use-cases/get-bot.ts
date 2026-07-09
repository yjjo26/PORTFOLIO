import { IBotRepository } from "../../domain/repositories/bot-repo";

export class GetBotResponseUseCase {
    private botRepository: IBotRepository;

    constructor(botRepository: IBotRepository) {
        this.botRepository = botRepository;
    }

    async execute(userInput: string): Promise<string> {
        if (!userInput.trim()) return "";
        return this.botRepository.getBotResponse(userInput);
    }
}
