/**
 * Formats a date to a relative time string (e.g., "2 days ago")
 * @param date The date to format (timestamp or Date object)
 * @returns A string representing the relative time
 */
export function formatDistanceToNow(date: number | Date): string {
  const now = new Date();
  const targetDate = new Date(date);
  const diffInSeconds = Math.floor((now.getTime() - targetDate.getTime()) / 1000);
  
  if (diffInSeconds < 60) {
    return 'just now';
  }
  
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return `${diffInMinutes} ${diffInMinutes === 1 ? 'minute' : 'minutes'} ago`;
  }
  
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return `${diffInHours} ${diffInHours === 1 ? 'hour' : 'hours'} ago`;
  }
  
  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 30) {
    return `${diffInDays} ${diffInDays === 1 ? 'day' : 'days'} ago`;
  }
  
  const diffInMonths = Math.floor(diffInDays / 30);
  if (diffInMonths < 12) {
    return `${diffInMonths} ${diffInMonths === 1 ? 'month' : 'months'} ago`;
  }
  
  const diffInYears = Math.floor(diffInMonths / 12);
  return `${diffInYears} ${diffInYears === 1 ? 'year' : 'years'} ago`;
}

/**
 * Formats a date to a string (e.g., "Jan 1, 2023")
 * @param date The date to format (timestamp or Date object)
 * @returns A formatted date string
 */
export function formatDate(date: number | Date): string {
  const options: Intl.DateTimeFormatOptions = { 
    month: 'short', 
    day: 'numeric', 
    year: 'numeric' 
  };
  return new Date(date).toLocaleDateString('en-US', options);
}

/**
 * Formats a date to a time string (e.g., "3:30 PM")
 * @param date The date to format (timestamp or Date object)
 * @returns A formatted time string
 */
export function formatTime(date: number | Date): string {
  const options: Intl.DateTimeFormatOptions = { 
    hour: 'numeric', 
    minute: 'numeric',
    hour12: true
  };
  return new Date(date).toLocaleTimeString('en-US', options);
}