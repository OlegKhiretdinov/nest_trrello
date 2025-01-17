import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

@Injectable()
export class SameUserGuard implements CanActivate {
  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const { id } = request.params;
    const { sub } = request.user;

    return !!id && !!sub && Number(id) === sub;
  }
}
