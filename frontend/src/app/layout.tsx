// app/layout.tsx
import Header from '@/app/components/Common/Header';
import Footer from '@/app/components/Common/Footer';
import '@/app/styles/globals.css';

export const metadata = {
  title: 'My App',
  description: 'A great app with dynamic styling.',
};

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow p-4">{children}</main>
        <Footer />
      </body>
    </html>
  );
};

export default Layout;
