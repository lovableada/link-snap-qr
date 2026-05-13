import PIXQRCodeGenerator from '@/components/PIXQRCodeGenerator';

const PIX = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Tool Section */}
      <section className="mb-16">
        <PIXQRCodeGenerator />
      </section>

      {/* SEO Content Section for AdSense Approval */}
      <article className="prose prose-slate max-w-4xl mx-auto bg-white p-8 rounded-2xl shadow-sm border border-border/50">
        <h2 className="text-2xl font-bold mb-6 gradient-text">Como gerar um QR Code PIX?</h2>
        
        <p className="mb-4 text-muted-foreground leading-relaxed">
          O <strong>Gerador de QR Code PIX</strong> é a maneira mais rápida e segura de receber pagamentos sem precisar que o cliente digite sua chave manualmente. Com um código QR PIX predefinido, você evita erros de digitação e acelera o checkout no seu estabelecimento, evento ou serviço.
        </p>

        <h3 className="text-xl font-semibold mt-8 mb-4">Passos para criar o QR Code do seu PIX</h3>
        <p className="mb-4 text-muted-foreground leading-relaxed">
          Para criar o seu QR Code, preencha os dados no formulário acima:
        </p>
        <ol className="list-decimal list-inside mb-6 text-muted-foreground space-y-2">
          <li><strong>Chave PIX:</strong> Insira a sua chave PIX exata (CPF, CNPJ, E-mail, Telefone ou Chave Aleatória).</li>
          <li><strong>Nome do Beneficiário:</strong> Digite o nome do titular da conta para validação do pagador.</li>
          <li><strong>Cidade:</strong> Insira a cidade do beneficiário (exigido pelo Banco Central).</li>
          <li><strong>Valor (Opcional):</strong> Defina um valor fixo se você deseja cobrar uma quantia exata. Deixe em branco se o pagador for definir o valor.</li>
          <li><strong>Identificador (Opcional):</strong> Um código curto e sem espaços (ex: TXT123) para ajudar na conciliação no seu extrato.</li>
        </ol>

        <h3 className="text-xl font-semibold mt-8 mb-4">Vantagens de utilizar o QR Code PIX no seu negócio</h3>
        <ul className="list-disc list-inside mb-6 text-muted-foreground space-y-2">
          <li><strong>Redução de Filas:</strong> Pagamentos muito mais rápidos. O cliente escaneia, confirma a senha e pronto.</li>
          <li><strong>Menos Erros:</strong> A chave e o valor já vão embutidos no código, evitando que o cliente pague a chave errada ou valor a menor.</li>
          <li><strong>Modernidade:</strong> O PIX é o meio de pagamento mais utilizado do Brasil. Ter um QR code na sua vitrine, mesa ou caixa é indispensável.</li>
        </ul>

        <h3 className="text-xl font-semibold mt-8 mb-4">Gerar QR Code PIX aqui é seguro?</h3>
        <p className="mb-4 text-muted-foreground leading-relaxed">
          Com certeza! A ferramenta do <strong className="text-primary">LinkSnap QR</strong> utiliza a especificação pública do Banco Central do Brasil (padrão EMV BR Code) e calcula o código CRC16 localmente no seu navegador. Isso significa que <strong>nenhuma informação de chave PIX ou dados pessoais são enviados para nossos servidores</strong>. Se você quiser também <a href="/" className="text-primary hover:underline">encurtar um Link para código QR</a>, confira nossa página inicial.
        </p>
      </article>
    </div>
  );
};

export default PIX;
