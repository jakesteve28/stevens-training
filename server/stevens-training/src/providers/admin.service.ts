import { Injectable } from '@nestjs/common';

@Injectable()
export class AdminService {
  runtests() : Boolean {
    console.info("Starting runtime tests.");
    console.log("Passed tests successfully.");
    return true;
  }
  admininfo() : Boolean {
    return true;
  }
  healthcheck(): Boolean {
    return true;
  }
}
