export function formatHourLabel(timestamp) {
    try {
        var date = new Date(timestamp);
        return date.toLocaleString(undefined, {
            weekday: 'short',
            hour: 'numeric'
        });
    }
    catch (err) {
        return '—';
    }
}
