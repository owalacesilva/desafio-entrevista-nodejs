import { ExceptionFilter, Catch, ArgumentsHost, HttpStatus } from '@nestjs/common';
import { UNIQUE_COMPANY_CNPJ_CONSTRAINT } from 'src/company/company.entity';
import { UNIQUE_USER_EMAIL_CONSTRAINT } from 'src/user/user.entity';
import { UNIQUE_VEHICLE_REGISTRY_CONSTRAINT } from 'src/vehicle/vehicle.entity';
import { QueryFailedError } from 'typeorm';

@Catch(QueryFailedError)
export class DuplicateEntryFilter implements ExceptionFilter {
  catch(exception: QueryFailedError, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse();

    let status: number, message: string = null;
    switch (true) {
      case exception.message.includes(UNIQUE_USER_EMAIL_CONSTRAINT):
        status = HttpStatus.UNPROCESSABLE_ENTITY;
        message = "Esse e-mail já foi cadastrado";
        break;
        case exception.message.includes(UNIQUE_COMPANY_CNPJ_CONSTRAINT):
        status = HttpStatus.UNPROCESSABLE_ENTITY;
        message = "Esse cnpj já foi cadastrado";
        break;
      case exception.message.includes(UNIQUE_VEHICLE_REGISTRY_CONSTRAINT):
        status = HttpStatus.UNPROCESSABLE_ENTITY;
        message = "Esse registro já foi cadastrado";
        break;
      default: 
        status = HttpStatus.INTERNAL_SERVER_ERROR;
        message = exception.message;
    }

    response.status(status)
      .json({
        status_code: status,
        message: message,
      });
  }
}
