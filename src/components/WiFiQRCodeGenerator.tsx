import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import QRCode from 'qrcode';
import { Download, Wifi, Lock, Zap } from 'lucide-react';

const WiFiQRCodeGenerator = () => {
  const [ssid, setSsid] = useState('');
  const [password, setPassword] = useState('');
  const [encryption, setEncryption] = useState('WPA');
  const [isHidden, setIsHidden] = useState(false);
  const [qrCodeUrl, setQrCodeUrl] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  const generateQRCode = async () => {
    if (!ssid.trim()) {
      toast({
        title: "Nome da Rede necessário",
        description: "Por favor, insira o nome da sua rede WiFi",
        variant: "destructive",
      });
      return;
    }

    // Format: WIFI:T:<encryption>;S:<ssid>;P:<password>;H:<hidden>;;
    const wifiString = `WIFI:T:${encryption};S:${ssid};P:${password};H:${isHidden ? 'true' : 'false'};;`;

    setIsGenerating(true);
    try {
      const qrCodeDataUrl = await QRCode.toDataURL(wifiString, {
        width: 256,
        margin: 2,
        color: {
          dark: '#000000',
          light: '#FFFFFF',
        },
      });
      setQrCodeUrl(qrCodeDataUrl);
      toast({
        title: "QR Code gerado!",
        description: "Seu QR Code de WiFi foi criado com sucesso",
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
    link.download = 'wifi-qrcode.png';
    link.href = qrCodeUrl;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast({
      title: "Download iniciado!",
      description: "Seu QR Code de WiFi está sendo baixado",
    });
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      generateQRCode();
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4">
      <div className="w-full max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="p-3 rounded-2xl bg-gradient-primary">
              <Wifi className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold gradient-text">
              QR Code WiFi
            </h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Compartilhe o acesso da sua rede sem fio rapidamente, sem precisar divulgar sua senha em texto plano.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* Input Section */}
          <Card className="glass-card p-8">
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <Lock className="w-6 h-6 text-primary" />
                <h2 className="text-2xl font-semibold">Dados da Rede</h2>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1 text-foreground">Nome da Rede (SSID)</label>
                  <Input
                    type="text"
                    placeholder="Minha_Rede_5G"
                    value={ssid}
                    onChange={(e) => setSsid(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="h-14 bg-secondary/50 border-border/50 focus:border-primary transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1 text-foreground">Senha (Opcional se for rede aberta)</label>
                  <Input
                    type="text"
                    placeholder="SenhaSuperSegura123"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="h-14 bg-secondary/50 border-border/50 focus:border-primary transition-colors"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1 text-foreground">Segurança</label>
                    <select
                      value={encryption}
                      onChange={(e) => setEncryption(e.target.value)}
                      className="w-full h-14 bg-secondary/50 border border-border/50 focus:border-primary transition-colors rounded-md px-3 text-sm"
                    >
                      <option value="WPA">WPA / WPA2 / WPA3</option>
                      <option value="WEP">WEP</option>
                      <option value="nopass">Nenhuma / Aberta</option>
                    </select>
                  </div>
                  <div className="flex items-center justify-center mt-6 gap-2">
                    <input
                      type="checkbox"
                      id="hidden-network"
                      checked={isHidden}
                      onChange={(e) => setIsHidden(e.target.checked)}
                      className="w-5 h-5 text-primary border-gray-300 rounded focus:ring-primary"
                    />
                    <label htmlFor="hidden-network" className="text-sm font-medium text-foreground cursor-pointer">
                      Rede Oculta
                    </label>
                  </div>
                </div>

                <Button
                  onClick={generateQRCode}
                  disabled={isGenerating}
                  className="w-full h-14 text-lg btn-glow bg-gradient-primary hover:bg-gradient-primary/90 mt-4"
                >
                  {isGenerating ? (
                    <div className="flex items-center gap-3">
                      <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                      Gerando...
                    </div>
                  ) : (
                    'Gerar QR Code WiFi'
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
                        alt="WiFi QR Code"
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
                        Preencha os dados e gere seu QR Code
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

export default WiFiQRCodeGenerator;
