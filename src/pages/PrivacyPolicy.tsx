const PrivacyPolicy = () => {
  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8 gradient-text">Política de Privacidade</h1>
      <article className="prose prose-slate max-w-none text-muted-foreground">
        <p><strong>Última atualização: {new Date().toLocaleDateString('pt-BR')}</strong></p>
        
        <h2>1. Introdução</h2>
        <p>Sua privacidade é importante para nós. É política do LinkSnap QR respeitar a sua privacidade em relação a qualquer informação sua que possamos coletar no site LinkSnap QR.</p>

        <h2>2. Informações que coletamos</h2>
        <p>A nossa ferramenta funciona primeiramente no lado do cliente (no seu navegador). Nós <strong>não coletamos</strong> nem armazenamos em nossos servidores os dados inseridos para a criação de Códigos QR, chaves PIX ou números de WhatsApp e mensagens.</p>
        
        <h3>Cookies e Analytics</h3>
        <p>Podemos utilizar cookies de terceiros (como Google Analytics e Google AdSense) para entender como o site é utilizado, quantas vezes ele é visitado, e para veicular anúncios não personalizados ou personalizados de acordo com as políticas do Google. Você tem o direito de desativar os cookies no seu navegador.</p>

        <h2>3. Como usamos as informações</h2>
        <p>A pouca informação técnica coletada (log de servidor padrão, métricas de Analytics) é utilizada exclusivamente para:</p>
        <ul>
          <li>Melhorar e otimizar nosso website;</li>
          <li>Fornecer métricas gerais de uso;</li>
          <li>Prevenir fraudes e abusos;</li>
        </ul>

        <h2>4. Compartilhamento de dados</h2>
        <p>Não compartilhamos informações de identificação pessoal publicamente ou com terceiros, exceto quando exigido por lei.</p>

        <h2>5. Aceitação</h2>
        <p>O uso continuado de nosso site será considerado como aceitação de nossas práticas em torno de privacidade e informações pessoais. Se você tiver alguma dúvida sobre como lidamos com dados do usuário e informações pessoais, entre em contacto connosco.</p>
      </article>
    </div>
  );
};

export default PrivacyPolicy;
