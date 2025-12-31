import { Roles } from '@enums';
import { BaseEntity } from 'common/database';

import { Column, Entity } from 'typeorm';

@Entity()
export class UserEntity extends BaseEntity {
  @Column({ type: 'varchar', nullable: false, unique: true })
  username: string;

  @Column({ type: 'varchar', nullable: false, unique: true })
  email: string;

  @Column({ type: 'varchar', nullable: false })
  password: string;

  @Column({ nullable: false, enum: Roles, default: Roles.USER })
  role: Roles;
}
