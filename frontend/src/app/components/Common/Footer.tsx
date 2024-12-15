// app/components/Common/Footer.tsx
"use client";
import { Tabs } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { House, Camera, Shirt, Settings } from 'lucide-react';

const Footer = () => {
  const router = useRouter();

  // タブのインデックスに基づいてページ遷移
  const handleTabChange = (event: React.ChangeEvent<any>) => {
    const index = event.target.value;
    const routes = ["/outfits", "/camera", "/closet", "/setting"];
    router.push(routes[index]);
  };

  return (
    <footer
    style={{
      position: "fixed",
      bottom: 0,
      width: "100%",
      background: "#fff",
      borderTop: "1px solid #ddd",
      zIndex: 1000,
    }}>
      <Tabs.Root
        onChange={handleTabChange}
        variant="enclosed"
        fitted
      >
        <Tabs.List>
          <Tabs.Trigger value="outfits"><House />Home</Tabs.Trigger>
          <Tabs.Trigger value="camera"><Camera />Camera</Tabs.Trigger>
          <Tabs.Trigger value="closet"><Shirt />Closet</Tabs.Trigger>
          <Tabs.Trigger value="setting"><Settings />Setting</Tabs.Trigger>
        </Tabs.List>
      </Tabs.Root>
    </footer>
    );
  };

export default Footer;
