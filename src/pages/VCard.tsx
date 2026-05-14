import VCardQRCodeGenerator from '@/components/VCardQRCodeGenerator';

const VCard = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <section className="mb-16">
        <VCardQRCodeGenerator />
      </section>

      {/* SEO Content Section for AdSense Approval */}
      <article className="prose prose-slate max-w-4xl mx-auto bg-white p-8 rounded-2xl shadow-sm border border-border/50">
        <h2 className="text-2xl font-bold mb-6 gradient-text">Cartão de Visita Digital (VCard)</h2>

        <p className="mb-4 text-muted-foreground leading-relaxed">
          O mundo do networking mudou e os antigos cartões de visita de papel estão sendo cada vez mais substituídos por soluções digitais ecológicas e práticas. Com um <strong>QR Code VCard</strong>, você centraliza todos os seus dados de contato e compartilha instantaneamente com um simples escaneamento de tela.
        </p>

        <h3 className="text-xl font-semibold mt-8 mb-4">Como funciona o VCard QR Code?</h3>
        <p className="mb-4 text-muted-foreground leading-relaxed">
          Ao preencher seus dados como Nome, Telefone, E-mail, Empresa e Cargo, a nossa ferramenta condensa todas essas informações em um formato padronizado conhecido como VCard. Esse código gera uma imagem que, quando lida pela câmera de qualquer smartphone, sugere imediatamente "Adicionar aos Contatos" na agenda do usuário. Simples assim.
        </p>

        <h3 className="text-xl font-semibold mt-8 mb-4">Vantagens do Cartão de Visitas Digital</h3>
        <ul className="list-disc list-inside mb-6 text-muted-foreground space-y-2">
          <li><strong>Ecológico e Sustentável:</strong> Economize centenas de reais com impressões físicas de papel que muitas vezes vão para o lixo.</li>
          <li><strong>Sem erros de digitação:</strong> Com os dados passados diretamente, o risco de alguém anotar seu telefone ou e-mail errado reduz a zero.</li>
          <li><strong>Facilidade de Atualização:</strong> Mudou de empresa ou cargo? Ao invés de jogar fora 500 cartões impressos, basta gerar um novo QR Code gratuitamente.</li>
          <li><strong>Fácil de Compartilhar:</strong> Coloque este QR Code na tela de bloqueio do seu celular, no crachá da sua empresa, LinkedIn ou na sua assinatura de e-mail.</li>
        </ul>
      </article>
    </div>
  );
};

export default VCard;
