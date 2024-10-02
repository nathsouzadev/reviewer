import { HealthModule } from '../health/health.module';
import { UsersModule } from '../resources/domain/users/users.module';

export const router = [
  {
    path: 'api',
    children: [
      {
        path: 'health',
        module: HealthModule,
      },
      {
        path: 'users',
        module: UsersModule
      },
    ],
  },
];
