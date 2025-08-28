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
          dark: '#000000',
          light: '#FFFFFF',
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

        {/* QR Code Information Section */}
        <div className="mt-16">
          <Card className="glass-card p-8">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold gradient-text mb-4">
                  O que é um QR Code?
                </h2>
                <div className="w-20 h-1 bg-gradient-primary mx-auto rounded-full"></div>
              </div>
              
              <div className="prose prose-lg max-w-none text-muted-foreground space-y-6">
                <p className="text-lg leading-relaxed">
                  O <strong className="text-foreground">QR Code</strong> (Quick Response Code) é um tipo de código bidimensional que pode armazenar 
                  informações como links, textos, contatos, entre outros dados. Ele foi criado em <strong className="text-foreground">1994 
                  pela empresa japonesa Denso Wave</strong>, com o objetivo de rastrear peças na indústria automobilística 
                  de forma rápida e eficiente.
                </p>

                <div className="grid md:grid-cols-2 gap-8 my-8">
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold text-foreground flex items-center gap-2">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      Evolução e Expansão
                    </h3>
                    <p className="leading-relaxed">
                      Com o tempo, seu uso se expandiu exponencialmente para o comércio, marketing digital, 
                      pagamentos eletrônicos, sistemas de identificação e até em documentos oficiais como 
                      carteiras de vacinação e certificados digitais.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold text-foreground flex items-center gap-2">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      Como Funciona
                    </h3>
                    <p className="leading-relaxed">
                      Para utilizá-lo, basta ter um <strong className="text-foreground">aplicativo leitor de QR Code</strong> ou 
                      a própria câmera do celular (na maioria dos smartphones atuais). Ao apontar a câmera para 
                      o código, o dispositivo reconhece automaticamente as informações.
                    </p>
                  </div>
                </div>

                <div className="bg-primary/5 border border-primary/20 rounded-xl p-6 my-8">
                  <h3 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-3">
                    <Zap className="w-6 h-6 text-primary" />
                    Vantagens dos QR Codes
                  </h3>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <strong className="text-foreground">Velocidade:</strong> Acesso instantâneo a informações
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <strong className="text-foreground">Versatilidade:</strong> Armazena diversos tipos de dados
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <strong className="text-foreground">Segurança:</strong> Pode incluir criptografia e validação
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <strong className="text-foreground">Sustentabilidade:</strong> Reduz o uso de papel impresso
                      </div>
                    </div>
                  </div>
                </div>

                <div className="text-center p-6 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-xl border border-primary/20">
                  <p className="text-lg font-medium text-foreground">
                    👉 Em resumo, o QR Code é uma ferramenta <strong>prática, segura e versátil</strong> que 
                    facilita a conexão entre o mundo físico e o digital, revolucionando a forma como 
                    compartilhamos e acessamos informações no século XXI.
                  </p>
                </div>

                <div className="mt-8 p-6 bg-secondary/20 rounded-xl border border-border/50">
                  <h3 className="text-lg font-semibold text-foreground mb-3">
                    💡 Curiosidades sobre QR Codes:
                  </h3>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="text-primary font-bold">•</span>
                      Podem armazenar até 4.296 caracteres alfanuméricos
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary font-bold">•</span>
                      Funcionam mesmo com até 30% de dano na imagem
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary font-bold">•</span>
                      São legíveis em qualquer direção (360°)
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary font-bold">•</span>
                      O nome "Quick Response" refere-se à velocidade de decodificação
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default QRCodeGenerator;