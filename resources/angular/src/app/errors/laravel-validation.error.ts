import { MessageBag } from '../entities';

export class LaravelValidationError extends Error {
  constructor(public messageBag: MessageBag) {
    super('Laravel validation failed');
  }
}
