import QRCodeGenerator from '@/components/QRCodeGenerator';

const Index = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Tool Section */}
      <section className="mb-16">
        <QRCodeGenerator />
      </section>

      {/* SEO Content Section for AdSense Approval */}
      <article className="prose prose-slate max-w-4xl mx-auto bg-white p-8 rounded-2xl shadow-sm border border-border/50">
        <h2 className="text-2xl font-bold mb-6 gradient-text">O que é um QR Code e como usá-lo?</h2>

        <p className="mb-4 text-muted-foreground leading-relaxed">
          Um <strong>QR Code (Quick Response Code)</strong> é um código de barras bidimensional que pode ser facilmente escaneado usando a maioria dos telefones celulares equipados com câmera. Diferente dos códigos de barras tradicionais, os QR Codes podem armazenar uma quantidade muito maior de dados e informações, como links de sites, textos, números de telefone, e muito mais.
        </p>

        <h3 className="text-xl font-semibold mt-8 mb-4">Como gerar um QR Code gratuitamente?</h3>
        <p className="mb-4 text-muted-foreground leading-relaxed">
          Usar nossa ferramenta gratuita de geração de QR Code é extremamente simples:
        </p>
        <ol className="list-decimal list-inside mb-6 text-muted-foreground space-y-2">
          <li><strong>Insira sua URL:</strong> Cole o link do site, perfil social ou documento que você deseja compartilhar no campo acima.</li>
          <li><strong>Personalize (Opcional):</strong> Dependendo das opções, você pode ajustar o design para que fique do jeito que preferir.</li>
          <li><strong>Baixe seu QR Code:</strong> Clique em "Baixar" (Download) e salve a imagem gerada no seu dispositivo.</li>
        </ol>

        <h3 className="text-xl font-semibold mt-8 mb-4">Por que utilizar QR Codes?</h3>
        <p className="mb-4 text-muted-foreground leading-relaxed">
          Os QR Codes revolucionaram a maneira como compartilhamos informações Offline para o mundo Online. Eles oferecem diversos benefícios:
        </p>
        <ul className="list-disc list-inside mb-6 text-muted-foreground space-y-2">
          <li><strong>Praticidade:</strong> Elimina a necessidade de digitar URLs longas e complexas no navegador.</li>
          <li><strong>Engajamento:</strong> Materiais impressos, como panfletos e cartões de visita, ganham vida ao direcionar instantaneamente o cliente para o seu site.</li>
          <li><strong>Marketing e Vendas:</strong> Facilitam promoções, cupons de desconto, e cardápios digitais para restaurantes (muito popular após a pandemia).</li>
          <li><strong>Acessibilidade Instantânea:</strong> É só apontar a câmera do celular e a mágica acontece.</li>
        </ul>

        <h3 className="text-xl font-semibold mt-8 mb-4">O QR Online é seguro?</h3>
        <p className="mb-4 text-muted-foreground leading-relaxed">
          Absolutamente! Nossa ferramenta de QR Code gera os códigos instantaneamente direto no seu navegador. Nós não armazenamos as URLs ou os dados digitados em nossos servidores para os códigos gerados aqui, garantindo total privacidade e velocidade. Além das URLs tradicionais, experimente também nossa ferramenta de <a href="/pix" className="text-primary hover:underline">QR Code para PIX</a>, nosso gerador de <a href="/whatsapp" className="text-primary hover:underline">Links de WhatsApp</a>, acesso à rede no <a href="/wifi" className="text-primary hover:underline">QR Code para WiFi</a> e nosso moderníssimo <a href="/vcard" className="text-primary hover:underline">Cartão de Visita Digital (VCard)</a>.
        </p>

        <h3 className="text-xl font-semibold mt-8 mb-4">Por que o QR Code está em toda parte hoje?</h3>
        <p className="mb-4 text-muted-foreground leading-relaxed">
          A adoção em massa dos QR Codes ocorreu principalmente devido à enorme base de smartphones no mundo todo, onde câmeras nativas já são equipadas com tecnologia de leitura. Diferentes setores do mercado incorporaram a tecnologia:
        </p>
        <ul className="list-disc list-inside mb-6 text-muted-foreground space-y-2">
          <li><strong>Restaurantes e Bares:</strong> Com menus digitais, as empresas economizam verba em papel e facilitam as transações rápidas na hora do pagamento com o <a href="/pix" className="text-primary hover:underline">PIX</a>.</li>
          <li><strong>Eventos e Credenciamento:</strong> QR Codes em crachás aceleram as entradas eliminando filas monstruosas na conferência.</li>
          <li><strong>Setor Imobiliário:</strong> Placas de "Vende-se" na porta do imóvel direcionam o comprador pelo celular instantaneamente para a simulação de um Tour Virtual.</li>
        </ul>
        <div className="bg-primary/5 p-6 rounded-xl border border-primary/10 mt-6">
          <p className="font-semibold text-foreground mb-2">Dica de Sucesso 🚀</p>
          <p className="text-muted-foreground text-sm">
            Para garantir que a leitura de seus QR Codes funcione em 100% dos casos, procure imprimi-los com um <strong>bom contraste de cor</strong> (idealmente o código nas cores escuras e o fundo em cor clara), respeitando as margens criadas automaticamente. Teste a impressão com seu próprio celular antes de lançar o material no mercado!
          </p>
        </div>
      </article>
    </div>
  );
};

export default Index;
