import { Link, useLocation } from 'react-router-dom';
import { LinkIcon, Wallet, MessageCircle, Zap } from 'lucide-react';

const Header = () => {
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'QR por Link', icon: LinkIcon },
    { path: '/pix', label: 'QR PIX', icon: Wallet },
    { path: '/whatsapp', label: 'QR WhatsApp', icon: MessageCircle }
  ];

  return (
    <header className="flex pt-5 pb-5 sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex items-center justify-center gap-3 mb-6 w-full">
        <div className="p-3 rounded-2xl bg-gradient-primary">
          <Zap className="w-6 h-6 text-white" />
        </div>
        <h1 className="text-3xl font-bold gradient-text">
          QR Online
        </h1>
      </div>
      <div className="container flex h-16 items-center">
        <nav className="flex items-center gap-6 mx-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;

            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${isActive
                    ? 'bg-gradient-primary text-white shadow-lg'
                    : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
                  }`}
              >
                <Icon className="w-5 h-5" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
};

export default Header;
