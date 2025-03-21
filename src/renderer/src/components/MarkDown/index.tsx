import { CopyOutlined } from '@ant-design/icons';
import { useDebounce } from 'ahooks';
import classNames from 'classnames';
import mermaid from 'mermaid';
import { useEffect, useRef, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import RehypeHighlight from 'rehype-highlight';
import RehypeKatex from 'rehype-katex';
import rehypeRaw from 'rehype-raw';
import RemarkBreaks from 'remark-breaks';
import RemarkGfm from 'remark-gfm';
import RemarkMath from 'remark-math';

import useStyles from './styles';

import './highlight.less';
// markdown
export interface MarkdownProps {
    className?: string;
    children: string;
}

export function Mermaid(props: { code: string }) {
    const ref = useRef<HTMLDivElement>(null);
    const [hasError, setHasError] = useState(false);

    useEffect(() => {
        if (props.code && ref.current) {
            mermaid
                .run({
                    nodes: [ref.current],
                    suppressErrors: true
                })
                .catch((e) => {
                    setHasError(true);
                    console.error('[Mermaid] ', e.message);
                });
        }
    }, [props.code]);

    function viewSvgInNewWindow() {
        const svg = ref.current?.querySelector('svg');
        if (!svg) {
            return;
        }
        // const text = new XMLSerializer().serializeToString(svg);
        // const blob = new Blob([text], { type: 'image/svg+xml' });
        // showImageModal(URL.createObjectURL(blob));
    }

    if (hasError) {
        return null;
    }

    return (
        <div
            className="no-dark mermaid"
            style={{
                cursor: 'pointer',
                overflow: 'auto'
            }}
            ref={ref}
            onClick={() => viewSvgInNewWindow()}
        >
            {props.code}
        </div>
    );
}

export function PreCode(props: { children: any }) {
    const ref = useRef<HTMLPreElement>(null);
    const refText = ref.current?.innerText;
    const [mermaidCode, setMermaidCode] = useState('');

    const renderMermaid = useDebounce(
        () => {
            if (!ref.current) {
                return;
            }
            const mermaidDom = ref.current.querySelector('code.language-mermaid');
            if (mermaidDom) {
                setMermaidCode((mermaidDom as HTMLElement).innerText);
            }
        },
        {
            wait: 600
        }
    );

    useEffect(() => {
        setTimeout(renderMermaid, 1);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [refText]);

    return (
        <>
            {mermaidCode.length > 0 && <Mermaid code={mermaidCode} key={mermaidCode} />}
            <pre ref={ref}>
                <div className="copy-code-button">
                    <CopyOutlined
                        onClick={() => {
                            if (ref.current) {
                                const code = ref.current.innerText;
                                console.log(code);
                            }
                        }}
                        style={{ opacity: 0.3 }}
                    />
                </div>

                {props.children}
            </pre>
        </>
    );
}

const Markdown = (props: MarkdownProps) => {
    const { children, className } = props;

    const { styles, cx } = useStyles();

    return (
        <div className={classNames('markdown', cx(styles.toString()), className)}>
            <ReactMarkdown
                rehypePlugins={[
                    rehypeRaw,
                    RehypeKatex,
                    [
                        RehypeHighlight,
                        {
                            detect: false,
                            ignoreMissing: true
                        }
                    ]
                ]}
                remarkPlugins={[RemarkMath, RemarkGfm, RemarkBreaks]}
                components={{
                    // eslint-disable-next-line
                    // @ts-ignore
                    pre: PreCode
                }}
            >
                {children}
            </ReactMarkdown>
        </div>
    );
};

export default Markdown;
