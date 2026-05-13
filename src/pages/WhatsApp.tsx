import WhatsAppQRCodeGenerator from '@/components/WhatsAppQRCodeGenerator';

const WhatsApp = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Tool Section */}
      <section className="mb-16">
        <WhatsAppQRCodeGenerator />
      </section>

      {/* SEO Content Section for AdSense Approval */}
      <article className="prose prose-slate max-w-4xl mx-auto bg-white p-8 rounded-2xl shadow-sm border border-border/50">
        <h2 className="text-2xl font-bold mb-6 gradient-text">Como criar um Link Direto para o WhatsApp?</h2>
        
        <p className="mb-4 text-muted-foreground leading-relaxed">
          O <strong>Gerador de Links e QR Code para WhatsApp</strong> é a ferramenta ideal para empresas e profissionais que desejam agilizar a comunicação com seus clientes. Com apenas um clique, o usuário abre o aplicativo do WhatsApp (ou WhatsApp Web) já com uma mensagem pré-definida e o seu número salvo, sem precisar adicioná-lo na agenda de contatos.
        </p>

        <h3 className="text-xl font-semibold mt-8 mb-4">Passo a Passo para Gerar seu Link do WhatsApp</h3>
        <p className="mb-4 text-muted-foreground leading-relaxed">
          Para criar o seu link personalizado, siga esses passos:
        </p>
        <ol className="list-decimal list-inside mb-6 text-muted-foreground space-y-2">
          <li><strong>Informe o seu Número:</strong> Digite o número do seu celular com o código de área (DDD).</li>
          <li><strong>Mensagem Opcional:</strong> Se desejar, crie uma mensagem padrão. Assim, quando o cliente clicar no link, essa mensagem já aparecerá na caixa de texto dele, facilitando o início da conversa. Exemplo: "Olá! Gostaria de fazer um orçamento."</li>
          <li><strong>Gere o Link e o QR Code:</strong> Clique em gerar. Você poderá copiar a URL curta para usar em botões do seu site ou no Instagram, além de baixar o QR Code para materiais impressos.</li>
        </ol>

        <h3 className="text-xl font-semibold mt-8 mb-4">Por que utilizar links do WhatsApp nos Negócios?</h3>
        <p className="mb-4 text-muted-foreground leading-relaxed">
          As vantagens de usar atalhos diretos para o WhatsApp são imensas:
        </p>
        <ul className="list-disc list-inside mb-6 text-muted-foreground space-y-2">
          <li><strong>Agilidade e Conversão:</strong> Facilita o contato do cliente, removendo barreiras de atrito (como adicionar número aos contatos), o que aumenta sua taxa de conversão em vendas.</li>
          <li><strong>Links Bio e Anúncios Mídias Sociais:</strong> Essencial para campanhas no Facebook Ads, Instagram Ads e para colocar na Bio do Instagram da sua loja.</li>
          <li><strong>Fácil de Compartilhar:</strong> Diferente de um contato de agenda, o QR Code pode ser colado em vitrines, flyers ou caixas de produtos com a mensagem "Tem alguma dúvida? Fale conosco no WhatsApp".</li>
        </ul>

        <h3 className="text-xl font-semibold mt-8 mb-4">É realmente gratuito?</h3>
        <p className="mb-4 text-muted-foreground leading-relaxed">
          Sim! A plataforma <strong className="text-primary">LinkSnap QR</strong> é 100% gratuita. Geramos os códigos localmente, o que significa que nem o seu número nem as mensagens são rastreados ou salvos em banco de dados por nós. Mantemos seu marketing simples, seguro e de uso gratuito! Se precisar, você também pode <a href="/" className="text-primary hover:underline">gerar QR Codes normais</a> ou de <a href="/pix" className="text-primary hover:underline">pagamentos PIX</a> em nossa plataforma.
        </p>
      </article>
    </div>
  );
};

export default WhatsApp;
