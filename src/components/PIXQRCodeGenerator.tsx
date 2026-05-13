import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import QRCode from 'qrcode';
import { Download, Wallet, Zap, CreditCard } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

type PixKeyType = 'email' | 'phone' | 'cpf' | 'random';

const PIXQRCodeGenerator = () => {
  const [pixKeyType, setPixKeyType] = useState<PixKeyType>('email');
  const [pixKey, setPixKey] = useState('');
  const [recipientName, setRecipientName] = useState('');
  const [city, setCity] = useState('');
  const [amount, setAmount] = useState('');
  const [qrCodeUrl, setQrCodeUrl] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  const validatePixKey = (key: string, type: PixKeyType): boolean => {
    switch (type) {
      case 'email':
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(key);
      case 'phone':
        return /^\+?[1-9]\d{1,14}$/.test(key.replace(/\D/g, ''));
      case 'cpf':
        {
          const cpf = key.replace(/\D/g, '');
          return cpf.length === 11;
        }
      case 'random':
        return key.length >= 32;
      default:
        return false;
    }
  };

  const formatCPF = (value: string): string => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 11) {
      return numbers
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    }
    return value;
  };

  const formatPhone = (value: string): string => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 11) {
      return numbers
        .replace(/^(\d{2})(\d)/, '($1) $2')
        .replace(/(\d{5})(\d{1,4})$/, '$1-$2');
    }
    return value;
  };

  const handlePixKeyChange = (value: string) => {
    if (pixKeyType === 'cpf') {
      setPixKey(formatCPF(value));
    } else if (pixKeyType === 'phone') {
      setPixKey(formatPhone(value));
    } else {
      setPixKey(value);
    }
  };

  const generatePixPayload = (): string => {
    // Chave PIX limpa (remove formatação de CPF e telefone)
    const cleanPixKey = pixKey.replace(/\D/g, '');
    const keyToUse = pixKeyType === 'cpf' || pixKeyType === 'phone' ? cleanPixKey : pixKey;

    // Merchant Account Information (tag 26)
    const merchantAccountInfo = `0014BR.GOV.BCB.PIX01${String(keyToUse.length).padStart(2, '0')}${keyToUse}`;

    // Merchant Category Code (tag 52)
    const merchantCategoryCode = '52040000';

    // Transaction Currency (tag 53) - 986 = BRL
    const transactionCurrency = '5303986';

    // Transaction Amount (tag 54) - opcional
    let transactionAmount = '';
    if (amount && parseFloat(amount) > 0) {
      const formattedAmount = parseFloat(amount).toFixed(2);
      transactionAmount = `54${String(formattedAmount.length).padStart(2, '0')}${formattedAmount}`;
    }

    // Country Code (tag 58)
    const countryCode = '5802BR';

    // Merchant Name (tag 59)
    const merchantName = `59${String(recipientName.length).padStart(2, '0')}${recipientName}`;

    // Merchant City (tag 60)
    const merchantCity = `60${String(city.length).padStart(2, '0')}${city}`;

    // Additional Data Field Template (tag 62)
    const additionalDataField = '62070503***';

    // Monta o payload sem o CRC
    const payload = `000201` + // Payload Format Indicator
      `26${String(merchantAccountInfo.length).padStart(2, '0')}${merchantAccountInfo}` +
      merchantCategoryCode +
      transactionCurrency +
      transactionAmount +
      countryCode +
      merchantName +
      merchantCity +
      additionalDataField +
      '6304'; // CRC16 placeholder

    // Calcula CRC16
    const crc16 = calculateCRC16(payload);

    return payload + crc16;
  };

  const calculateCRC16 = (str: string): string => {
    let crc = 0xFFFF;
    for (let i = 0; i < str.length; i++) {
      crc ^= str.charCodeAt(i) << 8;
      for (let j = 0; j < 8; j++) {
        if ((crc & 0x8000) !== 0) {
          crc = (crc << 1) ^ 0x1021;
        } else {
          crc = crc << 1;
        }
      }
    }
    return (crc & 0xFFFF).toString(16).toUpperCase().padStart(4, '0');
  };

  const generateQRCode = async () => {
    if (!pixKey.trim()) {
      toast({
        title: "Chave PIX necessária",
        description: "Por favor, insira uma chave PIX válida",
        variant: "destructive",
      });
      return;
    }

    if (!validatePixKey(pixKey, pixKeyType)) {
      toast({
        title: "Chave PIX inválida",
        description: `Por favor, insira uma ${getKeyTypeName(pixKeyType)} válida`,
        variant: "destructive",
      });
      return;
    }

    if (!recipientName.trim()) {
      toast({
        title: "Nome necessário",
        description: "Por favor, insira o nome do beneficiário",
        variant: "destructive",
      });
      return;
    }

    if (!city.trim()) {
      toast({
        title: "Cidade necessária",
        description: "Por favor, insira a cidade",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    try {
      const pixPayload = generatePixPayload();
      const qrCodeDataUrl = await QRCode.toDataURL(pixPayload, {
        width: 300,
        margin: 2,
        color: {
          dark: '#000000',
          light: '#FFFFFF',
        },
      });
      setQrCodeUrl(qrCodeDataUrl);
      toast({
        title: "QR Code PIX gerado!",
        description: "Seu QR Code PIX foi criado com sucesso",
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
    link.download = 'qrcode-pix.png';
    link.href = qrCodeUrl;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast({
      title: "Download iniciado!",
      description: "Seu QR Code PIX está sendo baixado",
    });
  };

  const getKeyTypeName = (type: PixKeyType): string => {
    const names = {
      email: 'email',
      phone: 'telefone',
      cpf: 'CPF',
      random: 'chave aleatória'
    };
    return names[type];
  };

  const getPlaceholder = (): string => {
    const placeholders = {
      email: 'seu@email.com',
      phone: '(11) 99999-9999',
      cpf: '000.000.000-00',
      random: 'chave-aleatória-de-32-caracteres'
    };
    return placeholders[pixKeyType];
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="p-3 rounded-2xl bg-gradient-primary">
                <Wallet className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-5xl font-bold gradient-text">
                PIX QR Code
              </h1>
            </div>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Gere QR Codes PIX para receber pagamentos instantâneos.
              Aceito em qualquer banco brasileiro.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 items-start">
            {/* Input Section */}
            <Card className="glass-card p-8">
              <div className="space-y-6">
                <div className="flex items-center gap-3 mb-6">
                  <CreditCard className="w-6 h-6 text-primary" />
                  <h2 className="text-2xl font-semibold">Dados do PIX</h2>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="keyType">Tipo de Chave PIX</Label>
                    <Select value={pixKeyType} onValueChange={(value) => {
                      setPixKeyType(value as PixKeyType);
                      setPixKey('');
                    }}>
                      <SelectTrigger className="h-12 bg-secondary/50 border-border/50">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="email">📧 Email</SelectItem>
                        <SelectItem value="phone">📱 Telefone</SelectItem>
                        <SelectItem value="cpf">🆔 CPF</SelectItem>
                        <SelectItem value="random">🔑 Chave Aleatória</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="pixKey">Chave PIX</Label>
                    <Input
                      id="pixKey"
                      type="text"
                      placeholder={getPlaceholder()}
                      value={pixKey}
                      onChange={(e) => handlePixKeyChange(e.target.value)}
                      className="h-12 bg-secondary/50 border-border/50 focus:border-primary transition-colors"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="recipientName">Nome do Beneficiário</Label>
                    <Input
                      id="recipientName"
                      type="text"
                      placeholder="João Silva"
                      value={recipientName}
                      onChange={(e) => setRecipientName(e.target.value)}
                      className="h-12 bg-secondary/50 border-border/50 focus:border-primary transition-colors"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="city">Cidade</Label>
                    <Input
                      id="city"
                      type="text"
                      placeholder="São Paulo"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="h-12 bg-secondary/50 border-border/50 focus:border-primary transition-colors"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="amount">Valor (Opcional)</Label>
                    <Input
                      id="amount"
                      type="number"
                      step="0.01"
                      min="0"
                      placeholder="0.00"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      className="h-12 bg-secondary/50 border-border/50 focus:border-primary transition-colors"
                    />
                  </div>

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
                      'Gerar QR Code PIX'
                    )}
                  </Button>
                </div>
              </div>
            </Card>

            {/* QR Code Display */}
            <Card className="glass-card p-8">
              <div className="text-center space-y-6">
                <h2 className="text-2xl font-semibold">Seu QR Code PIX</h2>

                <div className="flex items-center justify-center">
                  {qrCodeUrl ? (
                    <div className="space-y-6">
                      <div className="p-6 rounded-2xl bg-white inline-block animate-float">
                        <img
                          src={qrCodeUrl}
                          alt="QR Code PIX"
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
                          <Wallet className="w-8 h-8 text-primary" />
                        </div>
                        <p className="text-muted-foreground">
                          Preencha os dados e gere seu QR Code PIX
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </Card>
          </div>

          {/* PIX Information Section */}
          <div className="mt-16">
            <Card className="glass-card p-8">
              <div className="max-w-4xl mx-auto">
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold gradient-text mb-4">
                    O que é o PIX?
                  </h2>
                  <div className="w-20 h-1 bg-gradient-primary mx-auto rounded-full"></div>
                </div>

                <div className="prose prose-lg max-w-none text-muted-foreground space-y-6">
                  <p className="text-lg leading-relaxed">
                    O <strong className="text-foreground">PIX</strong> é o sistema de pagamentos instantâneos do Brasil,
                    criado pelo <strong className="text-foreground">Banco Central</strong> em 2020. Ele permite transferências
                    e pagamentos em tempo real, 24 horas por dia, 7 dias por semana, inclusive aos finais de semana e feriados.
                  </p>

                  <div className="grid md:grid-cols-2 gap-8 my-8">
                    <div className="space-y-4">
                      <h3 className="text-xl font-semibold text-foreground flex items-center gap-2">
                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                        Tipos de Chave PIX
                      </h3>
                      <p className="leading-relaxed">
                        Você pode cadastrar diferentes tipos de chaves: <strong className="text-foreground">CPF/CNPJ</strong>,
                        <strong className="text-foreground"> email</strong>, <strong className="text-foreground">telefone</strong> ou
                        uma <strong className="text-foreground">chave aleatória</strong> gerada pelo sistema.
                      </p>
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-xl font-semibold text-foreground flex items-center gap-2">
                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                        Como Usar o QR Code
                      </h3>
                      <p className="leading-relaxed">
                        Basta abrir o aplicativo do seu banco, selecionar a opção <strong className="text-foreground">PIX</strong>,
                        escolher <strong className="text-foreground">"Ler QR Code"</strong> e apontar a câmera para o código.
                        A transferência é instantânea!
                      </p>
                    </div>
                  </div>

                  <div className="bg-primary/5 border border-primary/20 rounded-xl p-6 my-8">
                    <h3 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-3">
                      <Zap className="w-6 h-6 text-primary" />
                      Vantagens do PIX
                    </h3>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                        <div>
                          <strong className="text-foreground">Instantâneo:</strong> Transferências em segundos
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                        <div>
                          <strong className="text-foreground">Gratuito:</strong> Sem taxas para pessoas físicas
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                        <div>
                          <strong className="text-foreground">24/7:</strong> Funciona qualquer dia, qualquer hora
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                        <div>
                          <strong className="text-foreground">Seguro:</strong> Protegido pelo Banco Central
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="text-center p-6 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-xl border border-primary/20">
                    <p className="text-lg font-medium text-foreground">
                      💰 O PIX revolucionou os pagamentos no Brasil, tornando-se a <strong>forma de pagamento
                        mais popular</strong> do país, superando até mesmo cartões de crédito e débito em
                      quantidade de transações.
                    </p>
                  </div>

                  <div className="mt-8 p-6 bg-secondary/20 rounded-xl border border-border/50">
                    <h3 className="text-lg font-semibold text-foreground mb-3">
                      🔒 Segurança no PIX:
                    </h3>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <span className="text-primary font-bold">•</span>
                        Sempre verifique os dados do beneficiário antes de confirmar
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary font-bold">•</span>
                        Não compartilhe senhas ou códigos de segurança
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary font-bold">•</span>
                        Use apenas aplicativos oficiais dos bancos
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary font-bold">•</span>
                        Confirme o valor antes de finalizar a transação
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

export default PIXQRCodeGenerator;
