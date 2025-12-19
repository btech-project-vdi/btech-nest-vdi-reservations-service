import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RpcException } from '@nestjs/microservices';
import { ReservationLaboratoryEquipment } from '../../entities/reservation-laboratory-equipment.entity';
import {
  UpdateAccessStatusDto,
  UpdateAccessStatusResponseDto,
} from '../../dto/update-access-status.dto';

@Injectable()
export class ReservationLaboratoryEquipmentUpdateAccessStatusService {
  constructor(
    @InjectRepository(ReservationLaboratoryEquipment)
    private readonly reservationLaboratoryEquipmentRepository: Repository<ReservationLaboratoryEquipment>,
  ) {}

  async execute(
    updateAccessStatusDto: UpdateAccessStatusDto,
  ): Promise<UpdateAccessStatusResponseDto> {
    const { reservationLaboratoryEquipmentId, accessStatus } =
      updateAccessStatusDto;
    // Verificar que la reserva existe
    const reservationLaboratoryEquipment =
      await this.reservationLaboratoryEquipmentRepository.findOne({
        where: { reservationLaboratoryEquipmentId },
      });
    if (!reservationLaboratoryEquipment)
      throw new RpcException({
        status: HttpStatus.NOT_FOUND,
        message: 'Reserva de equipo de laboratorio no encontrada',
      });
    // Actualizar el accessStatus
    reservationLaboratoryEquipment.accessStatus = accessStatus;
    await this.reservationLaboratoryEquipmentRepository.save(
      reservationLaboratoryEquipment,
    );
    return {
      message: 'Estado de acceso actualizado exitosamente',
    };
  }
}
