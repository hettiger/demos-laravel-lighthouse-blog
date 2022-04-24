import { MessageBag } from '../shared/entities';

export class LaravelValidationError extends Error {
  constructor(public messageBag: MessageBag) {
    super('Laravel validation failed');
  }
}
