// Parse <think></think> tags to think and answer - unstream response
export const parseReasoningContent = (text: string): [string, string] => {
    const regex = /<think>([\s\S]*?)<\/think>/;
    const match = text.match(regex);

    if (!match) {
        return ['', text];
    }

    const thinkContent = match[1].trim();

    // Add answer (remaining text after think tag)
    const answerContent = text.slice(match.index! + match[0].length);

    return [thinkContent, answerContent];
};

// Parse <think></think> tags to think and answer - stream response
export const parseReasoningStreamContent = () => {
    let isInThinkTag: boolean | undefined;

    const startTag = '<think>';
    let startTagBuffer = '';

    const endTag = '</think>';
    let endTagBuffer = '';

    /* 
      parseReasoning - 只控制是否主动解析 <think></think>，如果接口已经解析了，仍然会返回 think 内容。
    */
    const parsePart = (
        part: {
            choices: {
                delta: {
                    content?: string;
                    reasoning_content?: string;
                };
            }[];
        },
        parseReasoning = false
    ): [string, string] => {
        const content = part.choices?.[0]?.delta?.content || '';

        const reasoningContent = part.choices?.[0]?.delta?.reasoning_content || '';
        if (reasoningContent || !parseReasoning) {
            isInThinkTag = false;
            return [reasoningContent, content];
        }

        if (!content) {
            return ['', ''];
        }

        // 如果不在 think 标签中，或者有 reasoningContent(接口已解析），则返回 reasoningContent 和 content
        if (isInThinkTag === false) {
            return ['', content];
        }

        // 检测是否为 think 标签开头的数据
        if (isInThinkTag === undefined) {
            // Parse content think and answer
            startTagBuffer += content;
            // 太少内容时候，暂时不解析
            if (startTagBuffer.length < startTag.length) {
                return ['', ''];
            }

            if (startTagBuffer.startsWith(startTag)) {
                isInThinkTag = true;
                return [startTagBuffer.slice(startTag.length), ''];
            }

            // 如果未命中 think 标签，则认为不在 think 标签中，返回 buffer 内容作为 content
            isInThinkTag = false;
            return ['', startTagBuffer];
        }

        // 确认是 think 标签内容，开始返回 think 内容，并实时检测 </think>
        /* 
            检测 </think> 方案。
            存储所有疑似 </think> 的内容，直到检测到完整的 </think> 标签或超出 </think> 长度。
            content 返回值包含以下几种情况:
            abc - 完全未命中尾标签
            abc<th - 命中一部分尾标签
            abc</think> - 完全命中尾标签
            abc</think>abc - 完全命中尾标签
            </think>abc - 完全命中尾标签
            k>abc - 命中一部分尾标签
        */
        // endTagBuffer 专门用来记录疑似尾标签的内容
        if (endTagBuffer) {
            endTagBuffer += content;
            if (endTagBuffer.includes(endTag)) {
                isInThinkTag = false;
                const answer = endTagBuffer.slice(endTag.length);
                return ['', answer];
            } else if (endTagBuffer.length >= endTag.length) {
                // 缓存内容超出尾标签长度，且仍未命中 </think>，则认为本次猜测 </think> 失败，仍处于 think 阶段。
                const tmp = endTagBuffer;
                endTagBuffer = '';
                return [tmp, ''];
            }
            return ['', ''];
        } else if (content.includes(endTag)) {
            // 返回内容，完整命中</think>，直接结束
            isInThinkTag = false;
            const [think, answer] = content.split(endTag);
            return [think, answer];
        } else {
            // 无 buffer，且未命中 </think>，开始疑似 </think> 检测。
            for (let i = 1; i < endTag.length; i++) {
                const partialEndTag = endTag.slice(0, i);
                // 命中一部分尾标签
                if (content.endsWith(partialEndTag)) {
                    const think = content.slice(0, -partialEndTag.length);
                    endTagBuffer += partialEndTag;
                    return [think, ''];
                }
            }
        }

        // 完全未命中尾标签，还是 think 阶段。
        return [content, ''];
    };

    const getStartTagBuffer = () => startTagBuffer;

    return {
        parsePart,
        getStartTagBuffer
    };
};
