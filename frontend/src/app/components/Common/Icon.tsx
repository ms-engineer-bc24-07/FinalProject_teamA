//アイコン表示用
// app/components/Common/Icon.tsx
import React from 'react';

type IconProps = {
  name: string;
  size?: number;
};

const Icon = ({ name, size = 24 }: IconProps) => {
  return <i className={`icon-${name}`} style={{ fontSize: size }} />;
};

export default Icon;
