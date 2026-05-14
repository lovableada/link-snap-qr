import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import QRCode from 'qrcode';
import { Download, UserRound, Phone, Mail, Building2, UserCircle2 } from 'lucide-react';

const VCardQRCodeGenerator = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  
  const [qrCodeUrl, setQrCodeUrl] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  const generateQRCode = async () => {
    if (!firstName.trim() || !phone.trim()) {
      toast({
        title: "Dados incompletos",
        description: "Preencha ao menos o Nome e o Telefone",
        variant: "destructive",
      });
      return;
    }

    const vcard = `BEGIN:VCARD
VERSION:3.0
N:${lastName};${firstName};;;
FN:${firstName} ${lastName}
ORG:${company}
TITLE:${jobTitle}
TEL;TYPE=WORK,VOICE:${phone}
EMAIL:${email}
END:VCARD`;

    setIsGenerating(true);
    try {
      const qrCodeDataUrl = await QRCode.toDataURL(vcard, {
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
        description: "Seu Cartão de Visita Digital foi criado com sucesso",
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
    link.download = 'vcard-qrcode.png';
    link.href = qrCodeUrl;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast({
      title: "Download iniciado!",
      description: "Seu Cartão de Visita foi baixado",
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
              <UserCircle2 className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold gradient-text">
              Cartão de Visita Digital
            </h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Crie um QR Code de contato VCard. Ao ser escaneado, seus dados são salvos diretamente na agenda do cliente.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* Input Section */}
          <Card className="glass-card p-8">
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <UserRound className="w-6 h-6 text-primary" />
                <h2 className="text-2xl font-semibold">Seus Dados Pessoais</h2>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1 text-foreground">Nome *</label>
                    <Input
                      type="text"
                      placeholder="João"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      onKeyPress={handleKeyPress}
                      className="bg-secondary/50 border-border/50 focus:border-primary transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1 text-foreground">Sobrenome</label>
                    <Input
                      type="text"
                      placeholder="Silva"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      onKeyPress={handleKeyPress}
                      className="bg-secondary/50 border-border/50 focus:border-primary transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1 text-foreground flex items-center gap-2">
                       <Phone className="w-3 h-3 text-muted-foreground" /> Telefone *
                    </label>
                    <Input
                      type="tel"
                      placeholder="(11) 99999-9999"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      onKeyPress={handleKeyPress}
                      className="bg-secondary/50 border-border/50 focus:border-primary transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1 text-foreground flex items-center gap-2">
                      <Mail className="w-3 h-3 text-muted-foreground" /> E-mail
                    </label>
                    <Input
                      type="email"
                      placeholder="joao@empresa.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      onKeyPress={handleKeyPress}
                      className="bg-secondary/50 border-border/50 focus:border-primary transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1 text-foreground flex items-center gap-2">
                      <Building2 className="w-3 h-3 text-muted-foreground" /> Empresa
                    </label>
                    <Input
                      type="text"
                      placeholder="NovaTech"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      onKeyPress={handleKeyPress}
                      className="bg-secondary/50 border-border/50 focus:border-primary transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1 text-foreground">Cargo</label>
                    <Input
                      type="text"
                      placeholder="Gerente Comercial"
                      value={jobTitle}
                      onChange={(e) => setJobTitle(e.target.value)}
                      onKeyPress={handleKeyPress}
                      className="bg-secondary/50 border-border/50 focus:border-primary transition-colors"
                    />
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
                      Gerando VCard...
                    </div>
                  ) : (
                    'Gerar Cartão Digital'
                  )}
                </Button>
              </div>
            </div>
          </Card>

          {/* QR Code Display */}
          <Card className="glass-card p-8">
            <div className="text-center space-y-6">
              <h2 className="text-2xl font-semibold">Seu Cartão em QR Code</h2>

              <div className="flex items-center justify-center">
                {qrCodeUrl ? (
                  <div className="space-y-6">
                    <div className="p-6 rounded-2xl bg-white inline-block animate-float">
                      <img
                        src={qrCodeUrl}
                        alt="VCard QR Code"
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
                        <UserCircle2 className="w-8 h-8 text-primary" />
                      </div>
                      <p className="text-muted-foreground">
                        Preencha seus contatos e gere o QR Code
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

export default VCardQRCodeGenerator;
