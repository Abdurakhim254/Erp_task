import { UserEntity } from 'core/entity';

import { Repository } from 'typeorm';

export type UserRepository = Repository<UserEntity>;
