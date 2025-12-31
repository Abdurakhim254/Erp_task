import { ProductsEntity } from 'core/entity';

import { Repository } from 'typeorm';

export type ProductsRepository = Repository<ProductsEntity>;
