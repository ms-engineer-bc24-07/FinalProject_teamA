"use client";

import { ChakraProvider } from "@chakra-ui/react";
import { createSystem, defaultConfig } from "@chakra-ui/react";
import Header from "@/app/components/Common/Header";
import Footer from "@/app/components/Common/Footer";
import "@/app/styles/globals.css";
import { SystemContext } from "@/types"; // 型をインポート

export const system = createSystem(defaultConfig, {
  theme: {
    tokens: {
      fonts: {
        heading: { value: `'Figtree', sans-serif` },
        body: { value: `'Figtree', sans-serif` },
      },
    },
  },
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body>
        <ChakraProvider value={system}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              minHeight: "100vh",
            }}
          >
            {/* Headerを固定 */}
            <div style={{ flexShrink: 0 }}>
              <Header />
            </div>
            {/* メインコンテンツ領域 */}
            <div style={{ flex: "1", display: "flex" }}>
              <main
                style={{
                  flex: "1",
                  marginBottom: "60px",
                  display: "flex",
                  justifyContent: "center",
                  paddingTop: "100px", // Headerの高さを考慮してパディングを追加
                  paddingBottom: "80px", // Footerの高さを考慮してパディングを追加
                  alignItems: "center",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    width: "100%",
                    height: "100%",
                    maxWidth: "1200px",
                    padding: "20px",
                    boxSizing: "border-box",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  {children}
                </div>
              </main>
            </div>
            {/* Footerを固定 */}
            <div style={{ flexShrink: 0 }}>
              <Footer />
            </div>
          </div>
        </ChakraProvider>
      </body>
    </html>
  );
}
