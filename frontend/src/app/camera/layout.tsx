import React from 'react';
import './styles.css'; // スタイルファイルをインポート

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body>
        <div className="layout-container">
          <header className="header">
            <h1>My Application</h1>
          </header>
          <main className="main-content">{children}</main>
          <footer className="footer">
            <p>&copy; 2023 My Application</p>
          </footer>
        </div>
      </body>
    </html>
  );
}
