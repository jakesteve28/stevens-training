import { Controller, Get } from '@nestjs/common';
import { AdminService } from '../providers/admin.service';

@Controller()
export class AdminController {
  constructor(private readonly adminService: AdminService) {}
}
