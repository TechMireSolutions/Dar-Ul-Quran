/** Urdu long date for article bylines and public UI. */
export function formatPublishedDate(iso: string): string {
  return new Date(iso).toLocaleDateString('ur-PK', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}
