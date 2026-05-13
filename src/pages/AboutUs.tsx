import { Zap } from 'lucide-react';

const AboutUs = () => {
  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl">
      <div className="flex items-center gap-4 mb-8">
        <div className="p-4 rounded-2xl bg-gradient-primary">
          <Zap className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-3xl font-bold gradient-text">Sobre Nós</h1>
      </div>

      <article className="prose prose-slate max-w-none text-muted-foreground">
        <h2>A Nossa Missão</h2>
        <p>
          O <strong>QR Online</strong> nasceu com um propósito simples: ajudar pessoas e negócios a conectarem o mundo físico ao digital de forma rápida, gratuita e sem fricções.
        </p>
        <p>
          Nós percebemos que a maioria das ferramentas de QR Code ou exigiam cadastros demorados, ou cobravam mensalidades após alguns acessos, ou exibiam um milhão de popups agressivos. Nosso objetivo é fornecer uma utilidade limpa, veloz e direta ao ponto.
        </p>

        <h2>Nossos Diferenciais</h2>
        <ul>
          <li><strong>Zero Cadastros:</strong> Acesse, crie e baixe. Tudo em menos de 10 segundos.</li>
          <li><strong>Privacidade em Primeiro Lugar:</strong> Nós não guardamos as URLs, os seus dados do PIX ou os números de telefone em banco de dados para criar os códigos QR. As operações acontecem no seu dispositivo (navegador) para maior segurança.</li>
          <li><strong>Sem Limites de Scans:</strong> Diferente de outros serviços, os QR Codes gerados aqui são "Estáticos". Isso significa que eles nunca expiram e você não paga pelo número de vezes que eles são escaneados.</li>
        </ul>

        <h2>Fale Conosco</h2>
        <p>
          Tem alguma dúvida, encontrou um bug ou gostou da ferramenta e quer nos dar um feedback? Você pode entrar em contato através do nosso email de suporte oficial:
        </p>
        <p>
          <a href="mailto:contato@qronline.com.br" className="text-primary hover:underline font-bold">contato@qronline.com.br</a>
        </p>
        <p>Prometemos ler todas as mensagens e responder o mais rápido possível.</p>
      </article>
    </div>
  );
};

export default AboutUs;
