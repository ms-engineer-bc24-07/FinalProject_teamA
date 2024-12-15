// "use client"

// import { ChakraProvider, defaultSystem } from "@chakra-ui/react"
// import {
//   ColorModeProvider,
//   type ColorModeProviderProps,
// } from "./color-mode"

// export function Provider(props: ColorModeProviderProps) {
//   return (
//     <ChakraProvider value={defaultSystem}>
//       <ColorModeProvider {...props} />
//     </ChakraProvider>
//   )
// }


// // @/components/ui/provider.tsx

// // app/providers.tsx

// @/components/ui/provider.tsx
"use client";

import { ChakraProvider, SystemContext } from "@chakra-ui/react";
import { PropsWithChildren } from "react";

export const Provider = ({
  children,
  value
}: PropsWithChildren<{ value: SystemContext }>) => {
  return (
    <ChakraProvider value={value}>
      {children}
    </ChakraProvider>
  );
};