import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import QRCode from 'qrcode';
import { Download, MessageCircle, Smartphone, Zap } from 'lucide-react';

const WhatsAppQRCodeGenerator = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [message, setMessage] = useState('');
  const [qrCodeUrl, setQrCodeUrl] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  const formatPhoneNumber = (value: string): string => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 13) {
      // Formato: +55 (11) 99999-9999
      return numbers
        .replace(/^(\d{2})(\d{2})(\d{5})(\d{4})/, '+$1 ($2) $3-$4')
        .replace(/^(\d{2})(\d{2})(\d{4})(\d{4})/, '+$1 ($2) $3-$4')
        .replace(/^(\d{2})(\d{2})(\d)/, '+$1 ($2) $3');
    }
    return value;
  };

  const handlePhoneChange = (value: string) => {
    // Permite apenas números e o símbolo +
    const cleaned = value.replace(/[^\d+]/g, '');
    setPhoneNumber(cleaned);
  };

  const validatePhoneNumber = (phone: string): boolean => {
    const cleanPhone = phone.replace(/\D/g, '');
    // Deve ter pelo menos 10 dígitos (código do país + DDD + número)
    return cleanPhone.length >= 10 && cleanPhone.length <= 15;
  };

  const generateWhatsAppUrl = (): string => {
    // Remove todos os caracteres não numéricos
    const cleanPhone = phoneNumber.replace(/\D/g, '');

    // Adiciona o código do país se não tiver
    let formattedPhone = cleanPhone;
    if (!cleanPhone.startsWith('55') && cleanPhone.length <= 11) {
      formattedPhone = '55' + cleanPhone;
    }

    // Cria a URL do WhatsApp
    let whatsappUrl = `https://wa.me/${formattedPhone}`;

    // Adiciona a mensagem se houver
    if (message.trim()) {
      whatsappUrl += `?text=${encodeURIComponent(message)}`;
    }

    return whatsappUrl;
  };

  const generateQRCode = async () => {
    if (!phoneNumber.trim()) {
      toast({
        title: "Número necessário",
        description: "Por favor, insira um número de telefone válido",
        variant: "destructive",
      });
      return;
    }

    if (!validatePhoneNumber(phoneNumber)) {
      toast({
        title: "Número inválido",
        description: "Por favor, insira um número válido com DDD (ex: 55 11 99999-9999)",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    try {
      const whatsappUrl = generateWhatsAppUrl();
      const qrCodeDataUrl = await QRCode.toDataURL(whatsappUrl, {
        width: 300,
        margin: 2,
        color: {
          dark: '#25D366', // Verde do WhatsApp
          light: '#FFFFFF',
        },
      });
      setQrCodeUrl(qrCodeDataUrl);
      toast({
        title: "QR Code WhatsApp gerado!",
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
    link.download = 'qrcode-whatsapp.png';
    link.href = qrCodeUrl;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast({
      title: "Download iniciado!",
      description: "Seu QR Code WhatsApp está sendo baixado",
    });
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="p-3 rounded-2xl bg-[#25D366]">
                <MessageCircle className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-5xl font-bold gradient-text">
                WhatsApp QR Code
              </h1>
            </div>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Gere QR Codes para iniciar conversas no WhatsApp instantaneamente.
              Perfeito para atendimento e contato direto.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 items-start">
            {/* Input Section */}
            <Card className="glass-card p-8">
              <div className="space-y-6">
                <div className="flex items-center gap-3 mb-6">
                  <Smartphone className="w-6 h-6 text-[#25D366]" />
                  <h2 className="text-2xl font-semibold">Dados do WhatsApp</h2>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="phoneNumber">Número do WhatsApp</Label>
                    <Input
                      id="phoneNumber"
                      type="tel"
                      placeholder="+55 11 99999-9999"
                      value={phoneNumber}
                      onChange={(e) => handlePhoneChange(e.target.value)}
                      className="h-12 bg-secondary/50 border-border/50 focus:border-[#25D366] transition-colors"
                    />
                    <p className="text-xs text-muted-foreground">
                      Inclua o código do país (ex: +55 para Brasil)
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Mensagem Inicial (Opcional)</Label>
                    <Textarea
                      id="message"
                      placeholder="Olá! Gostaria de saber mais informações..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="min-h-32 bg-secondary/50 border-border/50 focus:border-[#25D366] transition-colors resize-none"
                    />
                    <p className="text-xs text-muted-foreground">
                      Esta mensagem aparecerá pré-preenchida na conversa
                    </p>
                  </div>

                  <Button
                    onClick={generateQRCode}
                    disabled={isGenerating}
                    className="w-full h-14 text-lg btn-glow bg-[#25D366] hover:bg-[#20BA5A] text-white"
                  >
                    {isGenerating ? (
                      <div className="flex items-center gap-3">
                        <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                        Gerando...
                      </div>
                    ) : (
                      'Gerar QR Code WhatsApp'
                    )}
                  </Button>
                </div>
              </div>
            </Card>

            {/* QR Code Display */}
            <Card className="glass-card p-8">
              <div className="text-center space-y-6">
                <h2 className="text-2xl font-semibold">Seu QR Code WhatsApp</h2>

                <div className="flex items-center justify-center">
                  {qrCodeUrl ? (
                    <div className="space-y-6">
                      <div className="p-6 rounded-2xl bg-white inline-block animate-float">
                        <img
                          src={qrCodeUrl}
                          alt="QR Code WhatsApp"
                          className="w-64 h-64"
                        />
                      </div>

                      <Button
                        onClick={downloadQRCode}
                        variant="outline"
                        className="flex items-center gap-2 h-12 px-6 border-[#25D366]/30 hover:border-[#25D366] hover:bg-[#25D366]/10"
                      >
                        <Download className="w-5 h-5" />
                        Baixar QR Code
                      </Button>
                    </div>
                  ) : (
                    <div className="w-64 h-64 rounded-2xl bg-secondary/30 border-2 border-dashed border-border flex items-center justify-center">
                      <div className="text-center space-y-3">
                        <div className="w-16 h-16 mx-auto rounded-full bg-[#25D366]/20 flex items-center justify-center">
                          <MessageCircle className="w-8 h-8 text-[#25D366]" />
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

          {/* WhatsApp Information Section */}
          <div className="mt-16">
            <Card className="glass-card p-8">
              <div className="max-w-4xl mx-auto">
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold gradient-text mb-4">
                    Por que usar QR Code do WhatsApp?
                  </h2>
                  <div className="w-20 h-1 bg-gradient-primary mx-auto rounded-full"></div>
                </div>

                <div className="prose prose-lg max-w-none text-muted-foreground space-y-6">
                  <p className="text-lg leading-relaxed">
                    O <strong className="text-foreground">QR Code do WhatsApp</strong> é uma forma prática e
                    profissional de facilitar o contato com seus clientes, permitindo que eles iniciem uma conversa
                    diretamente com você sem precisar salvar seu número ou digitar mensagens.
                  </p>

                  <div className="grid md:grid-cols-2 gap-8 my-8">
                    <div className="space-y-4">
                      <h3 className="text-xl font-semibold text-foreground flex items-center gap-2">
                        <div className="w-2 h-2 bg-[#25D366] rounded-full"></div>
                        Como Funciona
                      </h3>
                      <p className="leading-relaxed">
                        Ao escanear o QR Code, o celular abre automaticamente o WhatsApp com uma
                        conversa iniciada para o seu número, incluindo a mensagem pré-definida se você configurar uma.
                      </p>
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-xl font-semibold text-foreground flex items-center gap-2">
                        <div className="w-2 h-2 bg-[#25D366] rounded-full"></div>
                        Onde Usar
                      </h3>
                      <p className="leading-relaxed">
                        Ideal para <strong className="text-foreground">cartões de visita</strong>,
                        <strong className="text-foreground"> vitrines</strong>,
                        <strong className="text-foreground"> cardápios</strong>,
                        <strong className="text-foreground"> eventos</strong> e
                        <strong className="text-foreground"> materiais impressos</strong> em geral.
                      </p>
                    </div>
                  </div>

                  <div className="bg-[#25D366]/5 border border-[#25D366]/20 rounded-xl p-6 my-8">
                    <h3 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-3">
                      <Zap className="w-6 h-6 text-[#25D366]" />
                      Vantagens do QR Code WhatsApp
                    </h3>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-[#25D366] rounded-full mt-2 flex-shrink-0"></div>
                        <div>
                          <strong className="text-foreground">Contato Imediato:</strong> Sem necessidade de salvar número
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-[#25D366] rounded-full mt-2 flex-shrink-0"></div>
                        <div>
                          <strong className="text-foreground">Mensagem Pré-definida:</strong> Inicie a conversa com contexto
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-[#25D366] rounded-full mt-2 flex-shrink-0"></div>
                        <div>
                          <strong className="text-foreground">Profissional:</strong> Facilita o atendimento ao cliente
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-[#25D366] rounded-full mt-2 flex-shrink-0"></div>
                        <div>
                          <strong className="text-foreground">Rastreável:</strong> Saiba quantas pessoas escanearam
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="text-center p-6 bg-gradient-to-r from-[#25D366]/10 to-secondary/10 rounded-xl border border-[#25D366]/20">
                    <p className="text-lg font-medium text-foreground">
                      📱 Com mais de <strong>2 bilhões de usuários</strong> ativos, o WhatsApp é a plataforma
                      de mensagens mais popular do Brasil, tornando este QR Code essencial para qualquer negócio.
                    </p>
                  </div>

                  <div className="mt-8 p-6 bg-secondary/20 rounded-xl border border-border/50">
                    <h3 className="text-lg font-semibold text-foreground mb-3">
                      💡 Dicas de Uso:
                    </h3>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <span className="text-[#25D366] font-bold">•</span>
                        Use uma mensagem inicial que identifique de onde o cliente está vindo
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-[#25D366] font-bold">•</span>
                        Coloque o QR Code em locais visíveis e de fácil acesso
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-[#25D366] font-bold">•</span>
                        Teste o QR Code antes de imprimir para garantir que funciona
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-[#25D366] font-bold">•</span>
                        Mantenha o QR Code em alta resolução para melhor leitura
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default WhatsAppQRCodeGenerator;
