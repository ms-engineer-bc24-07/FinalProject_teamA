/**
 * フロントエンドで使用するライブラリのバージョン一覧
 * バージョンはインストール時点の正確なものを記載
 */

export const frontendDependencies = `
@chakra-ui/react==3.2.3
@emotion/react==11.14.0
react==18.3.1
react-dom==18.3.1
next==15.0.4
typescript==5.7.2
eslint==8.57.1
eslint-config-next==15.0.4
axios==1.7.9
`;

export const cliCommands = `
npx @chakra-ui/cli snippet add
npx @chakra-ui/cli snippet add native-select
npx @chakra-ui/cli snippet add dialog
npx @chakra-ui/cli snippet add toaster
`;
