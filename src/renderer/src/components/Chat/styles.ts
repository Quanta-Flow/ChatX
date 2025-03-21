import { createStyles } from 'antd-style';

const useStyle = createStyles(({ token, css }) => {
    return {
        layout: css`
            width: 100%;
            height: 100%;
            border-radius: ${token.borderRadius}px;
            display: flex;
            background: ${token.colorBgContainer};
            font-family: AlibabaPuHuiTi, ${token.fontFamily}, sans-serif;
        `,
        chat: css`
            height: 100%;
            width: 100%;
            max-width: 700px;
            margin: 0 auto;
            box-sizing: border-box;
            display: flex;
            flex-direction: column;
            padding: ${token.paddingLG}px;
            gap: 16px;
        `,
        messages: css`
            flex: 1;
        `,
        placeholder: css`
            padding-top: 32px;
        `,
        sender: css`
            box-shadow: ${token.boxShadow};
        `
    };
});

export default useStyle;
