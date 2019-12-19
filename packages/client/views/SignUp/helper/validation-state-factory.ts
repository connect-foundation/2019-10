import { ValidationState } from '../../../libs/validation-state/validation-state';

export class ValidationStateFactory {
  public static makeSuccessValidationState() {
    return new ValidationState(true, null);
  }

  public static makeFailValidationState(message: string) {
    return new ValidationState(false, message);
  }
}
