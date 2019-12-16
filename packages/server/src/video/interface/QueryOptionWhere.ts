import { FindOperator } from 'typeorm';

export interface QueryOptionWhere {
  status: number;
  createdAt?: FindOperator<string>;
}
