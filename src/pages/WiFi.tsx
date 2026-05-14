import WiFiQRCodeGenerator from '@/components/WiFiQRCodeGenerator';

const WiFi = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <section className="mb-16">
        <WiFiQRCodeGenerator />
      </section>

      {/* SEO Content Section for AdSense Approval */}
      <article className="prose prose-slate max-w-4xl mx-auto bg-white p-8 rounded-2xl shadow-sm border border-border/50">
        <h2 className="text-2xl font-bold mb-6 gradient-text">QR Code para Conexão WiFi: Praticidade e Segurança</h2>

        <p className="mb-4 text-muted-foreground leading-relaxed">
          Imagine receber visitantes na sua casa ou clientes em seu estabelecimento sem precisar ditar ou escrever aquela senha longa e complexa da sua rede sem fio. O <strong>QR Code para WiFi</strong> resolve exatamente esse problema, permitindo que pessoas se conectem à sua rede apenas escaneando a imagem com a câmera do celular.
        </p>

        <h3 className="text-xl font-semibold mt-8 mb-4">Como gerar um QR Code de WiFi?</h3>
        <p className="mb-4 text-muted-foreground leading-relaxed">
          Para criar seu QR code de acesso, siga estes passos em nossa ferramenta gratuita:
        </p>
        <ol className="list-decimal list-inside mb-6 text-muted-foreground space-y-2">
          <li><strong>Nome da Rede (SSID):</strong> Insira exatamente o nome da sua rede WiFi. Cuidado com letras maiúsculas e minúsculas!</li>
          <li><strong>Senha:</strong> Coloque a senha atual da sua rede.</li>
          <li><strong>Tipo de Segurança:</strong> Selecione o tipo de criptografia (normalmente WPA/WPA2, presente na maioria dos roteadores residenciais e comerciais).</li>
          <li><strong>Rede Oculta:</strong> Marque esta opção caso o nome da sua rede não fique visível para quem busca.</li>
          <li><strong>Gerar e Baixar:</strong> Clique em gerar e salve o código resultante para imprimi-lo ou disponibilizá-lo em uma tela.</li>
        </ol>

        <h3 className="text-xl font-semibold mt-8 mb-4">Vantagens de usar no seu negócio</h3>
        <p className="mb-4 text-muted-foreground leading-relaxed">
          Para estabelecimentos como cafés, restaurantes, hotéis, e clínicas, disponibilizar o acesso ao WiFi via QR Code oferece um ar de profissionalismo. Você elimina os eventuais erros de digitação e melhora significativamente a experiência do cliente. Basta exibir o código no menu de mesa, num quadro na recepção ou próximo ao caixa.
        </p>
      </article>
    </div>
  );
};

export default WiFi;
