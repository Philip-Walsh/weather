export function ensureError(value: unknown): Error {
  if (value instanceof Error) return value;

  let errorMessage = '⚠️ An unexpected error occurred ⚠️';

  if (typeof value !== 'undefined') {
    try {
      errorMessage = JSON.stringify(value);
    } catch {
      // 🔇 Silently ignore stringification errors
    }
  }
  //   TODO: remove console.error
  console.error(errorMessage);
  return new Error(`❌ Thrown value is not an instance of Error: ${errorMessage}`);
}
