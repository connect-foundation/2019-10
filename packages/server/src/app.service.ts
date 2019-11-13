import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Test } from '../../typeorm/src/entity/Test';

@Injectable()
export class AppService {
  public constructor(
    @InjectRepository(Test) private readonly userRepository: Repository<Test>,
  ) {}

  public getHello(): string {
    return 'Hello World!';
  }
}
