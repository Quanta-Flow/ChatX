import { createStyles } from 'antd-style';

const useStyles = createStyles(({ css }) => {
    return css({
        '&.markdown': {
            width: '100%',
            display: 'inline',
            wordBreak: 'break-word',
            lineHeight: 1.6,

            '& div': {
                display: 'inline'
            },

            a: {
                color: '#0366d6',
                textDecoration: 'none',
                borderBottom: '1px dotted #0366d6',

                '&:hover': {
                    borderBottomStyle: 'solid'
                }
            },

            'h1, h2, h3, h4, h5, h6': {
                marginTop: 24,
                marginBottom: 16,
                fontWeight: 'bold',
                cursor: 'pointer',

                '&:hover a.anchor': {
                    display: 'inline-block'
                }
            },

            h1: {
                fontSize: 32
            },

            h2: {
                fontSize: 24
            },

            h3: {
                fontSize: 20
            },

            h4: {
                fontSize: 16
            },

            h5: {
                fontSize: 14
            },

            h6: {
                fontSize: 12
            },

            p: {
                marginTop: 0,
                marginBottom: 10,
                display: 'inline-block',

                '&:last-child': {
                    marginBottom: 0
                }
            },

            ol: {
                marginBlockStart: 0,
                marginBlockEnd: 0,
                paddingInlineStart: 0,
                listStyleType: 'decimal',
                listStylePosition: 'inside',

                '& p': {
                    display: 'inline'
                }
            },

            li: {
                marginTop: 8,
                marginBottom: 8,
                listStyleType: 'decimal',
                listStylePosition: 'inside',

                '& p': {
                    display: 'inline'
                },

                '&:last-child': {
                    marginBottom: 0
                }
            },

            blockquote: {
                marginTop: 16,
                marginBottom: 16,
                paddingLeft: 16,
                borderLeft: '4px solid #dfe2e5',
                color: '#6a737d',

                '& > :first-child': {
                    marginTop: 0
                },

                '& > :last-child': {
                    marginBottom: 0
                }
            },

            hr: {
                height: 4,
                marginTop: 32,
                marginBottom: 32,
                padding: 0,
                backgroundColor: '#ddd',
                border: '0 none'
            },

            table: {
                width: '100%',
                maxWidth: '100%',
                borderCollapse: 'collapse',
                borderSpacing: 0
            },

            'th, td': {
                border: '1px solid #ccc',
                padding: 8,
                textAlign: 'left',
                verticalAlign: 'top'
            },

            th: {
                fontWeight: 'bold',
                backgroundColor: '#f6f8fa'
            },

            img: {
                maxWidth: '100%'
            },

            pre: {
                whiteSpace: 'pre-wrap',
                overflow: 'auto',
                fontSize: 14,
                // backgroundColor: '#f5f7f9',
                borderRadius: 3,
                position: 'relative',

                '& code': {
                    fontFamily: '"Courier New", Courier, monospace'
                }
            },

            'p>code, li>code': {
                padding: '1em',
                margin: '0.5em',
                fontSize: '85%',
                // backgroundColor: '#f5f7f9',
                borderRadius: 3,
                fontFamily: '"Courier New", Courier, monospace'
            },

            code: {
                padding: '1em',
                fontSize: '85%',
                borderRadius: 3,
                fontFamily: '"Courier New", Courier, monospace'
            },

            'pre code': {
                padding: '1em',
                display: 'block'
            },

            '.copy-code-button': {
                position: 'absolute',
                top: 5,
                right: 10,
                cursor: 'pointer'
            }
        }
    });
});

export default useStyles;
