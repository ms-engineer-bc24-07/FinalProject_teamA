// types.d.ts
export interface SystemContext {
    // Chakra UIのcreateSystem関数で返されるオブジェクトのプロパティに合わせて定義
    value: {
      theme: {
        tokens: {
          fonts: {
            heading: { value: string };
            body: { value: string };
          };
        };
      };
    };
    // その他の必要なプロパティを追加
    [key: string]: any;
  }
  
  export interface ValueObject {
    [key: string]: string;
  }