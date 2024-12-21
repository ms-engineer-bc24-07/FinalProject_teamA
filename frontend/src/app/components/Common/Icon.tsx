import { Box } from "@chakra-ui/react";
import React from "react";

type IconProps = {
  name: string;
  size?: number;
};

const Icon = ({ name, size = 24 }: IconProps) => {
  return (
    <Box
      as="i"
      className={`icon-${name}`}
      fontSize={`${size}px`}
      display="inline-block"
    />
  );
};

export default Icon;
//
