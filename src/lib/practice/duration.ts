/** Port of Shared/SharedUtilities/DurationFormatter.swift. */

export function formatMinutes(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  if (hours > 0 && remainingMinutes > 0) {
    return `${hours}h ${remainingMinutes}m`;
  } else if (hours > 0) {
    return `${hours}h`;
  }
  return `${remainingMinutes}m`;
}

export function formatShort(minutes: number): string {
  if (minutes < 60) {
    return `${minutes}m`;
  }

  const hours = minutes / 60;
  if (hours % 1 === 0) {
    return `${hours}h`;
  }
  return `${hours.toFixed(1)}h`;
}

/** mm:ss / h:mm:ss readout for the running timer. */
export function formatElapsed(totalSeconds: number): string {
  const s = Math.max(0, Math.floor(totalSeconds));
  const hours = Math.floor(s / 3600);
  const minutes = Math.floor((s % 3600) / 60);
  const seconds = s % 60;
  const mm = String(minutes).padStart(2, "0");
  const ss = String(seconds).padStart(2, "0");
  return hours > 0 ? `${hours}:${mm}:${ss}` : `${minutes}:${ss}`;
}
