import { Module } from '@nestjs/common';
import { SoapController } from './soap.controller';
import { SoapService } from './soap.service';
import { ProofControl } from 'src/modules/proof_contol.module';

@Module({
  imports: [ProofControl],
  controllers: [SoapController],
  providers: [SoapService],
})
export class SoapModule {}
