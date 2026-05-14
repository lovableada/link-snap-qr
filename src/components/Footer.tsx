import { Link } from 'react-router-dom';
import { Zap } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-secondary/30 border-t py-12 mt-auto">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="p-2 rounded-xl bg-gradient-primary">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <h3 className="font-bold text-lg gradient-text">QR Online</h3>
          </div>
          <p className="text-sm text-muted-foreground">
            A sua ferramenta gratuita e segura para gerar QRCodes rápidos para Links, PIX e WhatsApp. Sem necessidade de cadastro.
          </p>
        </div>
        <div>
          <h4 className="font-bold mb-4">Geradores Rápidos</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/" className="hover:text-primary transition-colors">QR Code para URL</Link></li>
            <li><Link to="/pix" className="hover:text-primary transition-colors">QR Code para PIX</Link></li>
            <li><Link to="/whatsapp" className="hover:text-primary transition-colors">QR Code para WhatsApp</Link></li>
            <li><Link to="/wifi" className="hover:text-primary transition-colors">QR Code para WiFi</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-4">Institucional</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/about" className="hover:text-primary transition-colors">Sobre Nós</Link></li>
            <li><Link to="/terms" className="hover:text-primary transition-colors">Termos de Uso</Link></li>
            <li><Link to="/privacy" className="hover:text-primary transition-colors">Política de Privacidade</Link></li>
            <li><Link to="/faq" className="hover:text-primary transition-colors">Perguntas Frequentes (FAQ)</Link></li>
          </ul>
        </div>
      </div>
      <div className="container mx-auto px-4 mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
        &copy; {new Date().getFullYear()} QR Online. Todos os direitos reservados.
      </div>
    </footer>
  );
};

export default Footer;
