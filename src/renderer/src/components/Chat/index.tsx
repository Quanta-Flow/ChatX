import { UserOutlined } from '@ant-design/icons';
import { Bubble, Sender, SenderProps, Welcome } from '@ant-design/x';
import { APP_CONFIG } from '@renderer/config/app';
import { GetProp, Space } from 'antd';

import MarkDown from '../MarkDown';
import Thinking from '../Thinking';
import useStyle from './styles';

const roles: GetProp<typeof Bubble.List, 'roles'> = {
    ai: {
        placement: 'start',
        avatar: { icon: <UserOutlined />, style: { background: '#fde3cf' } },
        typing: { step: 5, interval: 20 },
        style: {
            maxWidth: 600,
            marginInlineEnd: 44
        },
        styles: {
            content: {
                borderRadius: 16
            }
        },
        variant: 'borderless',
        messageRender: (items: any) => {
            const { reasoning_content, content } = items;
            return (
                <>
                    <Thinking
                        content={reasoning_content}
                        thinking={content.length === 0}
                    ></Thinking>
                    <MarkDown>{content}</MarkDown>
                </>
            );
        }
    },
    user: {
        avatar: { icon: <UserOutlined />, style: { background: '#87d068' } },
        placement: 'end',
        variant: 'filled'
    }
};

export interface ChatProps {
    messages: any;
    senderProps: SenderProps;
}

const Chat: React.FC<ChatProps> = (props: ChatProps) => {
    const { messages, senderProps } = props;
    const { styles } = useStyle();

    const placeholderNode = (
        <Space direction="vertical" size={16} className={styles.placeholder}>
            <Welcome
                variant="borderless"
                title={APP_CONFIG.title}
                description={APP_CONFIG.description}
            />
        </Space>
    );

    const items: GetProp<typeof Bubble.List, 'items'> = messages.map(({ id, message, status }) => ({
        key: id,
        role: status === 'local' ? 'user' : 'ai',
        content: message
    }));

    return (
        <div className={styles.chat}>
            {/* 🌟 消息列表 */}
            <Bubble.List
                items={
                    items.length > 0 ? items : [{ content: placeholderNode, variant: 'borderless' }]
                }
                roles={roles}
                className={styles.messages}
            />
            {/* 🌟 输入框 */}
            <Sender className={styles.sender} {...senderProps} />
        </div>
    );
};

export default Chat;
