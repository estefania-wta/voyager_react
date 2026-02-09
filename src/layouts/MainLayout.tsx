import { type ReactNode } from 'react';

interface MainLayoutProps {
  children: ReactNode;
}

export const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className="main-layout">
      <header>
        <nav>Header</nav>
      </header>
      <main>{children}</main>
      <footer>Footer</footer>
    </div>
  );
};
