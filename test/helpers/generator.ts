import { randomUUID } from 'crypto';
import dataSource from '../../src/config/db/dataSource';

export const generateMockUsers = async (mockUserId: string) => {
  const mockUsers = [
    {
      id: mockUserId,
      email: 'ada@reprograma.com.br',
      name: 'Ada Lovelace',
    },
    {
      id: randomUUID(),
      email: 'gracehooper@reprograma.com.br',
      name: 'Grace Hooper',
    },
  ];
  for (const user of mockUsers) {
    await dataSource.query(
      `insert into users (id, email, name) values ('${user.id}','${user.email}', '${user.name}')`,
    );
  }
};
