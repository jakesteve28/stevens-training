import { Controller, Get } from '@nestjs/common';
import { AdminService } from '../providers/admin.service';

@Controller('/admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}
  @Get('/test')
  async test() {
    return "hello world";
  }
}
