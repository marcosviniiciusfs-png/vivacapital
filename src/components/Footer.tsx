import { Phone, MapPin, Clock } from "lucide-react";
import maltaLogo from "@/assets/malta-logo.png";

const Footer = () => {
  return (
    <footer id="contato" className="bg-[hsl(var(--header-footer))] text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Logo e Descrição */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <img src={maltaLogo} alt="Malta Consórcios" className="h-12 w-auto" />
            </div>
            <p className="text-white/90 leading-relaxed">
              Sua parceira de confiança para realizar o sonho da casa própria e do carro novo. 
              Mais de 1000 famílias contempladas.
            </p>
          </div>

          {/* Contato */}
          <div>
            <h3 className="text-xl font-bold mb-4">Fale Conosco</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 mt-1 flex-shrink-0" />
                <div>
                  <p className="font-semibold">Telefone</p>
                  <p className="text-white/90">(11) 99999-9999</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 mt-1 flex-shrink-0" />
                <div>
                  <p className="font-semibold">WhatsApp</p>
                  <p className="text-white/90">(11) 99999-9999</p>
                </div>
              </div>
            </div>
          </div>

          {/* Localização e Horário */}
          <div>
            <h3 className="text-xl font-bold mb-4">Localização</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 mt-1 flex-shrink-0" />
                <div>
                  <p className="font-semibold">Endereço</p>
                  <p className="text-white/90">
                    Rua das Empresas, 123 – Centro<br />
                    São Paulo/SP – CEP: 01000-000
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 mt-1 flex-shrink-0" />
                <div>
                  <p className="font-semibold">Horário de Atendimento</p>
                  <p className="text-white/90">
                    Segunda à Sexta: 8h às 18h<br />
                    Sábado: 8h às 12h
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-white/90 text-sm">
              © 2025 Malta Consórcios. Todos os direitos reservados.
            </p>
            <div className="flex gap-6 text-sm">
              <button className="text-white/90 hover:text-white transition-colors">
                Política de Privacidade
              </button>
              <button className="text-white/90 hover:text-white transition-colors">
                Termos de Uso
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
