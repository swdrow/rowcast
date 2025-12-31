export function formatHourLabel(timestamp: string) {
  try {
    const date = new Date(timestamp);
    return date.toLocaleString(undefined, {
      weekday: 'short',
      hour: 'numeric'
    });
  } catch (err) {
    return '—';
  }
}
