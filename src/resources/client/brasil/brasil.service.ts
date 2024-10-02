import { Injectable, UnauthorizedException } from '@nestjs/common';
import axios from 'axios';
import { CNPJResponse } from './models/cnpj-response.model';
import { cnpjWireIn } from './adapters/cnpj-wire-in';
import { partnerCnpjWireIn } from './adapters/partner-cnpj-wire-in';
import { PartnerCnpjResponse } from './models/partner-cnpj-response.model';

@Injectable()
export class BrasilService {
  private readonly brasilApi = async (cnpj: string) =>
    axios({
      method: 'get',
      url: `https://brasilapi.com.br/api/cnpj/v1/${cnpj}`,
    });

  cnpj = async (cnpj: string): Promise<CNPJResponse> => {
    try {
      const response = await this.brasilApi(cnpj);

      return cnpjWireIn(response.status, cnpj);
    } catch (error) {
      return cnpjWireIn(error.response.status, cnpj);
    }
  };

  partnerCnpj = async (data: { cnpj: string; partner: string }): Promise<PartnerCnpjResponse> => {
    const response = await this.brasilApi(data.cnpj);

    const partners = response.data.qsa.map((partner) => ({
      name: partner.nome_socio,
      type: partner.qualificacao_socio,
    }));

    const findPartner = partners.find(
      (partner) => partner.name === data.partner,
    );

    if (!findPartner) {
      throw new UnauthorizedException('Partner not found');
    }

    return partnerCnpjWireIn(response.data);
  };
}
