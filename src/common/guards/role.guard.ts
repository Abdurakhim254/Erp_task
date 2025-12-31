import { Roles } from '@enums';
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

@Injectable()
export class RolesGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest();
    if (!req.user?.role || req.user?.role !== Roles.ADMIN) {
      throw new UnauthorizedException();
    } else {
      return true;
    }
  }
}
