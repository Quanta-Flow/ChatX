import { createStyles } from 'antd-style';

const useStyles = createStyles(({ css }) => {
    return css({
        '&.thinking-container': {
            '&-title': {
                backgroundColor: '#f5f5f5',
                padding: '7px 14px',
                borderRadius: 10,
                width: 'fit-content'
            },
            '&-content': {
                color: '#8b8b8b',
                position: 'relative',
                whiteSpace: 'pre-wrap',
                margin: 0,
                padding: ' 0 0 0 13px',
                lineHeight: '26px',

                '&-line': {
                    borderLeft: '2px solid #e5e5e5',
                    height: 'calc(100% - 10px)',
                    marginTop: 5,
                    position: 'absolute',
                    top: 0,
                    left: 0
                }
            }
        }
    });
});

export default useStyles;
