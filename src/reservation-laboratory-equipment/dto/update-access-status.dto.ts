import { IsEnum, IsNotEmpty, IsUUID } from 'class-validator';
import { AccessStatus } from '../enums/access-status.enum';
import { ResponseBaseMessageDto } from 'src/reservation/dto/response-base-message.dto';

export class UpdateAccessStatusDto {
  @IsUUID('all', {
    message: 'El reservationLaboratoryEquipmentId debe ser un UUID válido',
  })
  @IsNotEmpty({
    message: 'El reservationLaboratoryEquipmentId es requerido',
  })
  reservationLaboratoryEquipmentId: string;

  @IsEnum(AccessStatus, {
    message:
      'El accessStatus debe ser uno de los siguientes valores: PENDIENTE, INGRESADO, NO_INGRESADO',
  })
  @IsNotEmpty({ message: 'El accessStatus es requerido' })
  accessStatus: AccessStatus;
}

export class UpdateAccessStatusResponseDto extends ResponseBaseMessageDto {}
