import { BrasilCNPJResponse } from '../models/brasil-cnpj.response.model';
import { PartnerCnpjResponse } from '../models/partner-cnpj-response.model';

export const partnerCnpjWireIn = (
  data: BrasilCNPJResponse,
): PartnerCnpjResponse => ({
  cep: data.cep,
  partners: data.qsa.map((partner) => ({
    name: partner.nome_socio,
    type: partner.qualificacao_socio,
  })),
  cnae: data.cnae_fiscal_descricao,
});
