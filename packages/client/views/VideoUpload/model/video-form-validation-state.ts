import { ValidationState } from '../../../libs/validation-state/validation-state';

export class VideoFormValidationStates {
  public title: ValidationState;
  public description: ValidationState;

  public constructor() {
    this.title = new ValidationState(false, null);
    this.description = new ValidationState(false, null);
  }
}
