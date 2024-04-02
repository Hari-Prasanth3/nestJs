import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
// import { ROLES_KEY } from './roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.get<string[]>('role', context.getHandler());
    console.log(requiredRoles);
    
    if (!requiredRoles) {
      return true; // No roles required, allow access
    }
    
    const { user } = context.switchToHttp().getRequest();
    if (!user || !user.role) {
      return false; // User is not authenticated or does not have a role
    }
    
    return requiredRoles.includes(user.role); // Check if user has the required role
  
  }
  
}
