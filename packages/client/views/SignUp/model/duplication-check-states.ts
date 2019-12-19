import { ValidationState } from '../../../libs/validation-state/validation-state';

export class DuplicationValidationStates {
  public constructor() {
    this.username = new ValidationState(false, '');
  }

  public username: ValidationState;
}
