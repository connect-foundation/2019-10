import { FindOperator } from 'typeorm';

export interface QueryOptionWhere {
  status: number;
  name?: FindOperator<string>;
}
