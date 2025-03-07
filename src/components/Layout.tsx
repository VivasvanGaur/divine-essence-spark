
import { ReactNode } from 'react';
import Navbar from './Navbar';
import CursorEffect from './CursorEffect';

type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <CursorEffect />
      <Navbar />
      <main className="flex-grow">
        {children}
      </main>
      <footer className="py-8 bg-divine-light/30 backdrop-blur-sm border-t border-gold-light/30">
        <div className="divine-container">
          <div className="text-center">
            <p className="text-sm text-divine-dark/70 mb-2">
              "The journey to enlightenment begins with a single step of devotion."
            </p>
            <p className="text-xs text-divine-dark/50">
              © {new Date().getFullYear()} Spiritual Journey. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
