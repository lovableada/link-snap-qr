import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import QRCode from 'qrcode';
import { Download, LinkIcon, Zap } from 'lucide-react';

const QRCodeGenerator = () => {
  const [url, setUrl] = useState('');
  const [qrCodeUrl, setQrCodeUrl] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  const isValidUrl = (string: string) => {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  };

  const generateQRCode = async () => {
    if (!url.trim()) {
      toast({
        title: "URL necessária",
        description: "Por favor, insira uma URL válida",
        variant: "destructive",
      });
      return;
    }

    if (!isValidUrl(url)) {
      toast({
        title: "URL inválida",
        description: "Por favor, insira uma URL válida (ex: https://exemplo.com)",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    try {
      const qrCodeDataUrl = await QRCode.toDataURL(url, {
        width: 256,
        margin: 2,
        color: {
          dark: '#ffffff',
          light: '#00000000',
        },
      });
      setQrCodeUrl(qrCodeDataUrl);
      toast({
        title: "QR Code gerado!",
        description: "Seu QR Code foi criado com sucesso",
      });
    } catch (error) {
      toast({
        title: "Erro ao gerar QR Code",
        description: "Tente novamente em alguns instantes",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const downloadQRCode = () => {
    if (!qrCodeUrl) return;
    
    const link = document.createElement('a');
    link.download = 'qrcode.png';
    link.href = qrCodeUrl;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast({
      title: "Download iniciado!",
      description: "Seu QR Code está sendo baixado",
    });
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      generateQRCode();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="p-3 rounded-2xl bg-gradient-primary">
              <Zap className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-5xl font-bold gradient-text">
              QR Generator
            </h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Transforme qualquer link em um QR Code instantaneamente. 
            Simples, rápido e elegante.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* Input Section */}
          <Card className="glass-card p-8">
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <LinkIcon className="w-6 h-6 text-primary" />
                <h2 className="text-2xl font-semibold">Cole seu link</h2>
              </div>
              
              <div className="space-y-4">
                <Input
                  type="url"
                  placeholder="https://exemplo.com"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="h-14 text-lg bg-secondary/50 border-border/50 focus:border-primary transition-colors"
                />
                
                <Button 
                  onClick={generateQRCode}
                  disabled={isGenerating}
                  className="w-full h-14 text-lg btn-glow bg-gradient-primary hover:bg-gradient-primary/90"
                >
                  {isGenerating ? (
                    <div className="flex items-center gap-3">
                      <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                      Gerando...
                    </div>
                  ) : (
                    'Gerar QR Code'
                  )}
                </Button>
              </div>
            </div>
          </Card>

          {/* QR Code Display */}
          <Card className="glass-card p-8">
            <div className="text-center space-y-6">
              <h2 className="text-2xl font-semibold">Seu QR Code</h2>
              
              <div className="flex items-center justify-center">
                {qrCodeUrl ? (
                  <div className="space-y-6">
                    <div className="p-6 rounded-2xl bg-white inline-block animate-float">
                      <img 
                        src={qrCodeUrl} 
                        alt="QR Code" 
                        className="w-64 h-64"
                      />
                    </div>
                    
                    <Button
                      onClick={downloadQRCode}
                      variant="outline"
                      className="flex items-center gap-2 h-12 px-6 border-primary/30 hover:border-primary hover:bg-primary/10"
                    >
                      <Download className="w-5 h-5" />
                      Baixar QR Code
                    </Button>
                  </div>
                ) : (
                  <div className="w-64 h-64 rounded-2xl bg-secondary/30 border-2 border-dashed border-border flex items-center justify-center">
                    <div className="text-center space-y-3">
                      <div className="w-16 h-16 mx-auto rounded-full bg-primary/20 flex items-center justify-center">
                        <Zap className="w-8 h-8 text-primary" />
                      </div>
                      <p className="text-muted-foreground">
                        Cole um link e gere seu QR Code
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default QRCodeGenerator;