export interface BrasilCNPJResponse {
  cep: string;
  cnae_fiscal_descricao: string;
  qsa: Array<{
    nome_socio: string;
    qualificacao_socio: string;
  }>;
}
