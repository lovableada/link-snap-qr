const TermsOfUse = () => {
  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8 gradient-text">Termos de Uso</h1>
      <article className="prose prose-slate max-w-none text-muted-foreground">
        <p><strong>Última atualização: {new Date().toLocaleDateString('pt-BR')}</strong></p>

        <h2>1. Termos</h2>
        <p>Ao acessar ao site LinkSnap QR, concorda em cumprir estes termos de serviço, todas as leis e regulamentos aplicáveis e concorda que é responsável pelo cumprimento de todas as leis locais aplicáveis. Se você não concordar com algum desses termos, está proibido de usar ou acessar este site.</p>

        <h2>2. Uso da Licença</h2>
        <p>É concedida permissão para o uso gratuito e irrestrito da ferramenta geradora de QR Codes. Ao utilizar o serviço, você não deve:</p>
        <ul>
          <li>Modificar ou copiar os códigos fonte do site;</li>
          <li>Tentar descompilar ou fazer engenharia reversa de qualquer software contido no site LinkSnap QR;</li>
          <li>Remover quaisquer direitos autorais ou outras notações de propriedade dos materiais;</li>
          <li>Efetuar spam ou utilizar o site para criar links maliciosos que direcionam a fraudes (Phishing, Malware). Reservamo-nos o direito de tentar bloquear URLs notórias de golpe.</li>
        </ul>

        <h2>3. Isenção de responsabilidade</h2>
        <p>Os materiais no site da LinkSnap QR são fornecidos 'como estão'. A LinkSnap QR não oferece garantias, expressas ou implícitas, e, por este meio, isenta e nega todas as outras garantias, incluindo, sem limitação, garantias implícitas ou condições de comercialização, adequação a um fim específico ou não violação de propriedade intelectual ou outra violação de direitos.</p>
        <p>No caso do gerador de PIX, a LinkSnap não se responsabiliza por chaves digitadas incorretamente. O usuário é estritamente responsável por validar as informações no aplicativo bancário no momento do pagamento.</p>

        <h2>4. Limitações</h2>
        <p>Em nenhum caso a LinkSnap QR ou seus fornecedores serão responsáveis por quaisquer danos (incluindo, sem limitação, danos por perda de dados ou lucro ou devido a interrupção dos negócios) decorrentes do uso ou da incapacidade de usar os materiais em LinkSnap QR.</p>
        
        <h2>5. Modificações</h2>
        <p>A LinkSnap QR pode revisar estes termos de serviço do site a qualquer momento, sem aviso prévio. Ao usar este site, você concorda em ficar vinculado à versão atual desses termos de serviço.</p>
      </article>
    </div>
  );
};

export default TermsOfUse;
