import {
  IsEnum,
  IsOptional,
  IsString,
  IsArray,
  ValidateIf,
  Matches,
  IsNotEmpty,
} from 'class-validator';
import { ChartTimePeriod } from '../enums/chart-time-period.enum';

export class FindReservationsChartDataByHoursDto {
  @IsOptional()
  @IsArray({ message: 'laboratoryEquipmentIds debe ser un arreglo' })
  @IsString({
    each: true,
    message: 'Cada laboratoryEquipmentId debe ser un string válido',
  })
  laboratoryEquipmentIds?: string[];

  @IsOptional()
  @IsEnum(ChartTimePeriod, {
    message: 'timePeriod debe ser un valor válido del enum ChartTimePeriod',
  })
  timePeriod?: ChartTimePeriod;

  @ValidateIf(
    (o: FindReservationsChartDataByHoursDto) =>
      o.timePeriod === ChartTimePeriod.CUSTOM,
  )
  @IsString({ message: 'startDate es requerida cuando timePeriod es CUSTOM' })
  @Matches(/^\d{4}-\d{2}-\d{2}$/, {
    message: 'startDate debe tener formato YYYY-MM-DD',
  })
  startDate?: string;

  @ValidateIf(
    (o: FindReservationsChartDataByHoursDto) =>
      o.timePeriod === ChartTimePeriod.CUSTOM,
  )
  @IsString({ message: 'endDate es requerida cuando timePeriod es CUSTOM' })
  @Matches(/^\d{4}-\d{2}-\d{2}$/, {
    message: 'endDate debe tener formato YYYY-MM-DD',
  })
  endDate?: string;

  @IsNotEmpty({ message: 'subscriptionDetailId es requerido' })
  @IsString({ message: 'subscriptionDetailId debe ser un string' })
  subscriptionDetailId: string;
}

export class ReservationCountByHourDto {
  hour: string;
  count: number;
}

export class FindReservationsChartDataByHoursResponseDto {
  data: ReservationCountByHourDto[];
}
