export type MessageRole = "bot" | "user";

export interface Message {
    role: MessageRole;
    text: string;
}

export class BotDomainService {
    /**
     * Pure business logic: matches keywords and returns the appropriate response.
     */
    static getResponse(userInput: string): string {
        const text = userInput.toLowerCase();
        
        if (text.includes("누구") || text.includes("이름") || text.includes("who are you")) {
            return "저는 Google Deepmind의 'Advanced Agentic Coding' 팀에서 개발한 AI 코딩 어시스턴트, **Antigravity(안티그래비티)** 입니다. 이 포트폴리오의 개발도 제가 함께 도왔습니다! 🚀";
        }
        if (text.includes("안녕") || text.includes("hello") || text.includes("hi")) {
            return "안녕하세요! 무엇을 도와드릴까요? 포트폴리오나 개발 관련 질문을 환영합니다.";
        }
        if (text.includes("포트폴리오") || text.includes("portfolio")) {
            return "이 포트폴리오는 Next.js(App Router), Tailwind CSS, Framer Motion 기반으로 제작되었으며, 저 Antigravity가 코드 작성과 배포, 트러블슈팅을 함께 진행했습니다.";
        }
        if (text.includes("할 줄 아는") || text.includes("능력") || text.includes("기능") || text.includes("what can you do")) {
            return "저는 파일 시스템 제어, 터미널 명령어 실행, 코드 작성 및 수정, 디버깅, 그리고 웹 애플리케이션 구축에 특화되어 있습니다. 말 그대로 'Agentic'하게 동작합니다.";
        }
        
        const defaultResponses = [
            "흥미로운 질문이네요. 조금 더 구체적으로 말씀해주시겠어요?",
            "해당 명령어에 대한 처리를 완료했습니다. 추가 지시를 내려주세요.",
            "이 포트폴리오의 주인이신 '용제'님은 다재다능한 풀스택 & AI 프로덕트 엔지니어입니다. 저도 아주 잘 알고 있죠!",
            "명령을 분석 중입니다... 완료되었습니다. 다른 도움이 필요하신가요?",
            "저는 당신의 페어 프로그래밍 파트너입니다. 언제든 코드를 작성할 준비가 되어있습니다."
        ];
        return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
    }
}
