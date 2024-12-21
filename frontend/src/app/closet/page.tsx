"use client";

import { Tabs, Link, Box } from "@chakra-ui/react";

export default function Closet() {
  return (
    <Box>
      <Tabs.Root defaultValue="tops">
        <Tabs.List>
          <Tabs.Trigger value="tops" asChild>
            <Link unstyled href="#tops">
              Tops
            </Link>
          </Tabs.Trigger>
          <Tabs.Trigger value="bottoms" asChild>
            <Link unstyled href="#bottoms">
              Bottoms
            </Link>
          </Tabs.Trigger>
          <Tabs.Trigger value="outer" asChild>
            <Link unstyled href="#outer">
              Outer
            </Link>
          </Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value="tops">Tops</Tabs.Content>
        <Tabs.Content value="bottoms">Bottoms</Tabs.Content>
        <Tabs.Content value="outer">Outer</Tabs.Content>
      </Tabs.Root>
    </Box>
  );
}
