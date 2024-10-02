export interface PartnerCnpjResponse {
  cep: string;
  partners: Array<{
    name: string;
    type: string;
  }>;
  cnae: string;
}
