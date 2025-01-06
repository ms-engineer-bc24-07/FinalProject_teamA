"use client";

import { Box } from "@chakra-ui/react";
import { ChakraProvider } from "@chakra-ui/react";
import { SystemContext } from "@/types"; // 型をインポート
import { createSystem, defaultConfig } from "@chakra-ui/react";

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
          <Box as="main" minH="100vh" pt={16}>
            {children}
          </Box>
        </ChakraProvider>
      </body>
    </html>
  );
}
