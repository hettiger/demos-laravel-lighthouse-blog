export function isUncaughtPromiseError(error: unknown): error is UncaughtPromiseError {
  return typeof error === 'object' && error !== null && error instanceof Error && 'rejection' in error;
}
