import { CNPJResponse } from '../models/cnpj-response.model';

const invalidStatus = [404, 400];

export const cnpjWireIn = (status: number, cnpj: string): CNPJResponse => {
  if (invalidStatus.includes(status)) {
    return {
      cnpj,
      isValid: false,
    };
  }

  return {
    cnpj,
    isValid: true,
  };
};
