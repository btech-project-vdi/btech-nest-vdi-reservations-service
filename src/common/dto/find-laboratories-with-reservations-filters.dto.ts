import { PaginationDto } from './pagination.dto';
import { IsBoolean, IsOptional, IsString, IsArray } from 'class-validator';
import { Type } from 'class-transformer';

export class FindLaboratoriesWithReservationsFiltersDto extends PaginationDto {
  @IsString({ message: 'subscriptionDetailId debe ser un UUID válido' })
  subscriptionDetailId: string;

  @IsOptional()
  @IsString({ message: 'searchTerm debe ser un string' })
  searchTerm?: string;

  @IsOptional()
  @IsBoolean({ message: 'El campo isActive debe ser un valor booleano' })
  @Type(() => Boolean)
  isActive?: boolean;

  @IsArray({ message: 'laboratoryEquipmentIds debe ser un array de strings' })
  @IsString({
    each: true,
    message: 'Cada ID en laboratoryEquipmentIds debe ser un UUID válido',
  })
  laboratoryEquipmentIds: string[];
}

export class LaboratoryWithReservationsFilterResponseDto {
  laboratoryEquipmentId: string;
  laboratoryId: string;
  laboratoryName: string;
  quantity: number;
  isActive: boolean;
}
