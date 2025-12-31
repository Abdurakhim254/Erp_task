import { ProductStatus } from '@enums';
import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';

export class CreateProductDto {
  @IsInt()
  @Min(0)
  product_count: number;

  @IsInt()
  @Min(0)
  @Max(100)
  implemented: number;

  @IsString()
  @IsNotEmpty()
  address: string;

  @IsString()
  @IsNotEmpty()
  user: string;

  @IsEnum(ProductStatus)
  @IsOptional()
  status?: ProductStatus;

  @IsString()
  @IsOptional()
  supplier?: string;

  @IsString()
  @IsOptional()
  note?: string;

  @IsInt()
  @Min(0)
  cost_price: number;

  @IsInt()
  @Min(0)
  selling_price: number;

  @IsInt()
  @Min(0)
  delivery_price: number;
}
