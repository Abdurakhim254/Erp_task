import { ProductStatus } from '@enums';
import { BaseEntity } from 'common/database';

import { Column, Entity } from 'typeorm';

@Entity()
export class ProductsEntity extends BaseEntity {
  @Column({ type: 'integer', nullable: false, default: 0 })
  product_count: number;

  @Column({ type: 'integer', default: 0 })
  implemented: number;

  @Column({ type: 'varchar', nullable: false })
  address: string;

  @Column({ type: 'varchar', nullable: false })
  user: string;

  @Column({
    type: 'enum',
    nullable: false,
    enum: ProductStatus,
    default: ProductStatus.UNCOMPLETED,
  })
  status: ProductStatus;

  @Column({ type: 'varchar', nullable: true })
  supplier: string;

  @Column({ type: 'varchar', nullable: true })
  note: string;

  @Column({ type: 'integer', nullable: false })
  cost_price: number;

  @Column({ type: 'integer', nullable: false })
  selling_price: number;

  @Column({ type: 'integer', nullable: false })
  delivery_price: number;
}
