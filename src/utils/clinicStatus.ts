import siteConfig from '../content/site.config.json';

export interface ClinicStatusResult {
  isOpen: boolean;
  statusKey: 'openNow' | 'opensToday' | 'opensTomorrow' | 'opensDay' | 'closed' | 'holiday';
  timeStr?: string;
  dayStr?: string;
  holidayReason?: string;
  displayText: string;
}

const DAYS: Array<keyof typeof siteConfig.hours> = [
  'sunday',
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday'
];

/**
 * Format 24h time ("10:00") into 12h time ("10:00 AM")
 */
function formatTime12h(time24: string): string {
  const [h, m] = time24.split(':').map(Number);
  const period = h >= 12 ? 'PM' : 'AM';
  const hour12 = h % 12 === 0 ? 12 : h % 12;
  return `${hour12}:${m < 10 ? '0' + m : m} ${period}`;
}

/**
 * Calculate current clinic status based on Indian Standard Time.
 */
export function getClinicStatus(customDate?: Date): ClinicStatusResult {
  const now = customDate || new Date();
  
  // Format current date in Asia/Kolkata timezone (YYYY-MM-DD)
  const kolkataDateStr = now.toLocaleDateString('en-CA', { timeZone: 'Asia/Kolkata' });
  const kolkataTimeStr = now.toLocaleTimeString('en-GB', { timeZone: 'Asia/Kolkata', hour12: false });
  const [currentHour, currentMin] = kolkataTimeStr.split(':').map(Number);
  const currentMinutesSinceMidnight = currentHour * 60 + currentMin;

  // Determine current day of week in Asia/Kolkata
  const dayIndex = new Date(`${kolkataDateStr}T12:00:00+05:30`).getDay();
  const todayKey = DAYS[dayIndex];

  // 1. Check Holiday Notice
  if (siteConfig.holiday.enabled && siteConfig.holiday.startDate && siteConfig.holiday.endDate) {
    if (kolkataDateStr >= siteConfig.holiday.startDate && kolkataDateStr <= siteConfig.holiday.endDate) {
      return {
        isOpen: false,
        statusKey: 'holiday',
        holidayReason: siteConfig.holiday.message || 'Holiday',
        displayText: 'Clinic closed today (Holiday)'
      };
    }
  }

  // 2. Check Today's Hours
  const todayHours = siteConfig.hours[todayKey];
  if (todayHours && !todayHours.isClosed) {
    const [openH, openM] = todayHours.open.split(':').map(Number);
    const [closeH, closeM] = todayHours.close.split(':').map(Number);
    const openMinutes = openH * 60 + openM;
    const closeMinutes = closeH * 60 + closeM;

    if (currentMinutesSinceMidnight >= openMinutes && currentMinutesSinceMidnight < closeMinutes) {
      return {
        isOpen: true,
        statusKey: 'openNow',
        displayText: 'Open now'
      };
    }

    if (currentMinutesSinceMidnight < openMinutes) {
      const formattedOpen = formatTime12h(todayHours.open);
      return {
        isOpen: false,
        statusKey: 'opensToday',
        timeStr: formattedOpen,
        displayText: `Opens today at ${formattedOpen}`
      };
    }
  }

  // 3. If closed or after hours today, find next opening day
  for (let offset = 1; offset <= 7; offset++) {
    const nextDayIndex = (dayIndex + offset) % 7;
    const nextDayKey = DAYS[nextDayIndex];
    const nextHours = siteConfig.hours[nextDayKey];

    if (nextHours && !nextHours.isClosed) {
      const formattedOpen = formatTime12h(nextHours.open);
      if (offset === 1) {
        return {
          isOpen: false,
          statusKey: 'opensTomorrow',
          timeStr: formattedOpen,
          displayText: `Closed · Opens tomorrow at ${formattedOpen}`
        };
      } else {
        const dayNameCapitalized = nextDayKey.charAt(0).toUpperCase() + nextDayKey.slice(1);
        return {
          isOpen: false,
          statusKey: 'opensDay',
          dayStr: dayNameCapitalized,
          timeStr: formattedOpen,
          displayText: `Closed · Opens ${dayNameCapitalized} at ${formattedOpen}`
        };
      }
    }
  }

  return {
    isOpen: false,
    statusKey: 'closed',
    displayText: 'Closed today'
  };
}
