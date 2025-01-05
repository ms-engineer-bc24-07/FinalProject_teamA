"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

// コンテクストの型を定義
interface AuthContextType {
  user: string | null;
  login: (username: string) => void;
  logout: () => void;
}

// デフォルト値を設定してコンテクストを作成
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// プロバイダコンポーネントの作成
export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<string | null>(null);

  const login = (username: string) => {
    setUser(username);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// カスタムフックでコンテクストを使用
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthContextProvider");
  }
  return context;
};
