import { DecodedNIC } from '@/types';

export function decodeSriLankanNIC(rawNic: string | null | undefined): DecodedNIC | null {
  const cleaned = (rawNic || '').trim().toUpperCase();
  let year = null;
  let dayOfYear = null;

  if (/^\d{9}[VX]$/.test(cleaned)) {
    year = 1900 + parseInt(cleaned.substring(0, 2), 10);
    dayOfYear = parseInt(cleaned.substring(2, 5), 10);
  } else if (/^\d{12}$/.test(cleaned)) {
    year = parseInt(cleaned.substring(0, 4), 10);
    dayOfYear = parseInt(cleaned.substring(4, 7), 10);
  } else {
    return null;
  }

  const isFemale = dayOfYear > 500;
  const adjustedDay = isFemale ? dayOfYear - 500 : dayOfYear;
  if (adjustedDay < 1 || adjustedDay > 366) return null;

  const months = [
    { name: 'Jan', days: 31 },
    { name: 'Feb', days: 29 },
    { name: 'Mar', days: 31 },
    { name: 'Apr', days: 30 },
    { name: 'May', days: 31 },
    { name: 'Jun', days: 30 },
    { name: 'Jul', days: 31 },
    { name: 'Aug', days: 31 },
    { name: 'Sep', days: 30 },
    { name: 'Oct', days: 31 },
    { name: 'Nov', days: 30 },
    { name: 'Dec', days: 31 }
  ];

  let remaining = adjustedDay;
  let monthName = 'Jan';
  for (const m of months) {
    if (remaining <= m.days) {
      monthName = m.name;
      break;
    }
    remaining -= m.days;
  }

  return {
    valid: true,
    birthDate: `${String(remaining).padStart(2, '0')} ${monthName} ${year}`,
    birthYear: year,
    gender: isFemale ? 'Female' : 'Male',
    age: 2026 - year,
    formattedNIC: cleaned
  };
}

