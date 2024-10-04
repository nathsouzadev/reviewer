import { HealthModule } from '../health/health.module';
import { UsersModule } from '../resources/domain/users/users.module';
import { RevivewModule } from '../resources/domain/revivew/revivew.module';

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
      {
        path: 'review',
        module: RevivewModule
      }
    ],
  },
];
