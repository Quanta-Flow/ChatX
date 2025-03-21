import { Flex } from 'antd';
import classNames from 'classnames';
import { Atom, ChevronDown, ChevronUp } from 'lucide-react';
import { CSSProperties, useEffect, useState } from 'react';

import Markdown from '../MarkDown';
import useStyles from './styles';

export interface ThinkingProps {
    content?: string;
    duration?: number;
    style?: CSSProperties;
    thinking?: boolean;
}

const Thinking: React.FC<ThinkingProps> = (props: ThinkingProps) => {
    const { thinking, duration, content = '' } = props;
    const [showDetail, setShowDetail] = useState(false);

    const { styles } = useStyles();

    useEffect(() => {
        setShowDetail(!!thinking);
    }, [thinking]);

    if (content.trim().length === 0) {
        return null;
    }

    return (
        <Flex gap={8} vertical className={classNames('thinking-container', styles.toString())}>
            <Flex
                className={classNames('thinking-container-title', styles.toString())}
                flex={1}
                gap={8}
                onClick={() => {
                    setShowDetail(!showDetail);
                }}
                style={{ cursor: 'pointer' }}
            >
                {thinking ? (
                    <Flex align={'center'} gap={8}>
                        <Atom size={14} />
                        <Flex>思考中...</Flex>
                    </Flex>
                ) : (
                    <Flex align={'center'} gap={8}>
                        <Atom size={14} />
                        <Flex>
                            {!duration
                                ? '已深度思考'
                                : `已深度思考 用时${((duration || 0) / 1000).toFixed(1)}`}
                        </Flex>
                    </Flex>
                )}
                <Flex gap={4} align="center">
                    {showDetail && content && (
                        <div
                            onClick={(event) => {
                                event.stopPropagation();
                            }}
                        ></div>
                    )}
                    {showDetail ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </Flex>
            </Flex>

            <div className={classNames('thinking-container-content', styles.toString())}>
                <div
                    className={classNames('thinking-container-content-line', styles.toString())}
                ></div>
                {showDetail && (
                    <>{typeof content === 'string' ? <Markdown>{content}</Markdown> : content}</>
                )}
            </div>
        </Flex>
    );
};

export default Thinking;
