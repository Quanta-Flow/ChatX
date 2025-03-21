import { XAgentConfigCustom } from '@ant-design/x/es/use-x-agent';

import { ollama } from '../ollama';
import { parseReasoningStreamContent } from '../think';

export const request: XAgentConfigCustom<any>['request'] = async (info, callbacks) => {
    const { onUpdate, onSuccess } = callbacks;
    const { message } = info;
    if (!message) {
        return;
    }
    let answer = '';
    let reasoning = '';
    try {
        const response = await ollama.chat({
            model: 'deepseek-r1:1.5b',
            messages: [{ role: 'user', content: message }],
            stream: true
        });
        const { parsePart } = parseReasoningStreamContent();

        for await (const part of response) {
            if (part.done) {
                onSuccess({
                    reasoning_content: reasoning,
                    content: answer
                });
                return;
            }

            const newPart = {
                choices: [
                    {
                        delta: {
                            content: part.message.content
                        }
                    }
                ]
            };

            const [reasoningContent, content] = parsePart(newPart, true);

            answer += content;
            reasoning += reasoningContent;

            onUpdate({
                reasoning_content: reasoning,
                content: answer
            });
        }
    } catch (error) {
        console.error('error', error);
        onSuccess({
            reasoning_content: reasoning,
            content: answer
        });
    }
};
