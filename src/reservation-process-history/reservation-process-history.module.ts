import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReservationProcessHistory } from './entities/reservation-process-history.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ReservationProcessHistory])],
})
export class ReservationProcessHistoryModule {}
