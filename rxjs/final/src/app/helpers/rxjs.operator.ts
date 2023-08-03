import { OperatorFunction, tap } from 'rxjs';

export function log<T>(message?: string): OperatorFunction<T, T> {
  return tap((e) => console.log(message, e));
}
