import { useXAgent, useXChat } from '@ant-design/x';
import { createStyles } from 'antd-style';
import React, { useState } from 'react';

import Chat from './components/Chat';
import { ollama, request } from './utils';

const useStyle = createStyles(({ token, css }) => {
    return {
        layout: css`
            width: 100%;
            height: 100%;
            border-radius: ${token.borderRadius}px;
            display: flex;
            background: ${token.colorBgContainer};
            font-family: AlibabaPuHuiTi, ${token.fontFamily}, sans-serif;
        `
    };
});

const App: React.FC = () => {
    const { styles } = useStyle();

    const [content, setContent] = useState('');

    const [agent] = useXAgent<any>({
        request
    });

    const { onRequest, messages } = useXChat({
        agent
    });

    const onSubmit = async (nextContent: string) => {
        if (!nextContent) {
            return;
        }
        onRequest(nextContent);
        setContent('');
    };

    return (
        <div className={styles.layout}>
            <Chat
                messages={messages}
                senderProps={{
                    value: content,
                    onSubmit,
                    onChange: setContent,
                    loading: agent.isRequesting(),
                    onCancel: () => {
                        ollama.abort();
                    }
                }}
            ></Chat>
        </div>
    );
};

export default App;
