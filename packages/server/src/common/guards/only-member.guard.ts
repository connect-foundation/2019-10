import {
  ExecutionContext,
  CanActivate,
  BadRequestException,
} from '@nestjs/common';

export class OnlyMemberGuard implements CanActivate {
  public canActivate(context: ExecutionContext): boolean | Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    if (!request.user) {
      throw new BadRequestException('Only allowed to a member');
    }

    return true;
  }
}
