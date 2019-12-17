import { ValidationState } from '../../../libs/validation-state/validation-state';

export class UserFormValidationState {
  public constructor() {
    this.username = new ValidationState(true, '');
    this.description = new ValidationState(true, '');
  }

  public username: ValidationState;
  public description: ValidationState;
}
