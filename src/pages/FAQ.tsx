import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { HelpCircle } from "lucide-react";

const FAQ = () => {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="text-center mb-12">
        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="p-3 rounded-2xl bg-gradient-primary">
            <HelpCircle className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold gradient-text">
            Perguntas Frequentes
          </h1>
        </div>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Tire suas dúvidas sobre nossa plataforma e como gerar seus QR Codes.
        </p>
      </div>

      <div className="bg-white p-8 rounded-2xl shadow-sm border border-border/50">
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger className="text-lg">O serviço é totalmente gratuito?</AccordionTrigger>
            <AccordionContent className="text-muted-foreground text-base">
              Sim! Nossa ferramenta é 100% gratuita para uso pessoal e comercial. Não há limites de geração e você não precisa se cadastrar para criar seus QR Codes.
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="item-2">
            <AccordionTrigger className="text-lg">Os QR Codes expiram?</AccordionTrigger>
            <AccordionContent className="text-muted-foreground text-base">
              Não. Os QR Codes gerados em nossa plataforma são estáticos e não dependem de nossos servidores para funcionar (exceto por eventuais encurtamentos ou serviços externos que você utilize). Eles funcionarão para sempre enquanto o conteúdo original (como o link ou o PIX) continuar válido.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-3">
            <AccordionTrigger className="text-lg">Vocês armazenam meus dados ou as URLs geradas?</AccordionTrigger>
            <AccordionContent className="text-muted-foreground text-base">
              Não. A geração dos QR Codes é feita diretamente no seu navegador de forma instantânea. Nós não rastreamos, não guardamos histórico e não armazenamos as informações que você insere em nossos servidores.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-4">
            <AccordionTrigger className="text-lg">Posso usar o QR Code para minha empresa?</AccordionTrigger>
            <AccordionContent className="text-muted-foreground text-base">
              Com certeza! Você pode utilizar os códigos que gerar aqui em panfletos, cartões de visita, sites, vitrines e qualquer outro material de divulgação da sua marca.
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="item-5">
            <AccordionTrigger className="text-lg">Qual o formato de imagem baixado?</AccordionTrigger>
            <AccordionContent className="text-muted-foreground text-base">
              Atualmente o download padrão é feito em formato PNG, otimizado com boa resolução para garantir a leitura rápida usando aplicativos e câmeras de celulares.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
};

export default FAQ;
