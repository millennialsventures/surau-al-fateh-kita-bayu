export interface PrayerSlot {
  key: "fajr" | "dhuhr" | "asr" | "maghrib" | "isha";
  name: string;
  time: string;
  period: string;
  timestamp?: number;
}

export interface DailyPrayerSchedule {
  zone: string;
  dateDisplay: string;
  locationDisplay: string;
  hijriDate?: string;
  prayers: PrayerSlot[];
  activeKey: "fajr" | "dhuhr" | "asr" | "maghrib" | "isha";
}

// Fallback times matching standard SGR01 timetable
const DEFAULT_TIMES: Record<PrayerSlot["key"], { time: string; period: string; hour24: number; min: number }> = {
  fajr: { time: "5:54", period: "Pagi", hour24: 5, min: 54 },
  dhuhr: { time: "1:15", period: "Tengah Hari", hour24: 13, min: 15 },
  asr: { time: "4:38", period: "Petang", hour24: 16, min: 38 },
  maghrib: { time: "7:22", period: "Malam", hour24: 19, min: 22 },
  isha: { time: "8:32", period: "Malam", hour24: 20, min: 32 },
};

function formatMalayDate(d: Date): string {
  const days = ["Ahad", "Isnin", "Selasa", "Rabu", "Khamis", "Jumaat", "Sabtu"];
  const months = [
    "Januari",
    "Februari",
    "Mac",
    "April",
    "Mei",
    "Jun",
    "Julai",
    "Ogos",
    "September",
    "Oktober",
    "November",
    "Disember",
  ];

  const dayName = days[d.getDay()];
  const day = d.getDate();
  const monthName = months[d.getMonth()];
  const year = d.getFullYear();

  return `${dayName}, ${day} ${monthName} ${year}`;
}

function unixToTimeString(unix: number): { time: string; period: string; hour24: number; min: number } {
  const d = new Date(unix * 1000);
  // Kuala Lumpur timezone UTC+8
  const hours = d.getUTCHours() + 8;
  const h24 = hours >= 24 ? hours - 24 : hours;
  const m = d.getUTCMinutes();
  const mStr = m.toString().padStart(2, "0");

  let period = "Pagi";
  let h12 = h24;
  if (h24 >= 12 && h24 < 14) {
    period = "Tengah Hari";
  } else if (h24 >= 14 && h24 < 19) {
    period = "Petang";
  } else if (h24 >= 19 || h24 < 5) {
    period = "Malam";
  }

  if (h12 > 12) h12 -= 12;
  if (h12 === 0) h12 = 12;

  return {
    time: `${h12}:${mStr}`,
    period,
    hour24: h24,
    min: m,
  };
}

export function determineActivePrayer(
  now: Date,
  slots: Record<PrayerSlot["key"], { hour24: number; min: number }>
): PrayerSlot["key"] {
  // convert now to minutes of day in UTC+8
  const utcHours = now.getUTCHours() + 8;
  const curHours = utcHours >= 24 ? utcHours - 24 : utcHours;
  const curMins = curHours * 60 + now.getUTCMinutes();

  const fajrMin = slots.fajr.hour24 * 60 + slots.fajr.min;
  const dhuhrMin = slots.dhuhr.hour24 * 60 + slots.dhuhr.min;
  const asrMin = slots.asr.hour24 * 60 + slots.asr.min;
  const maghribMin = slots.maghrib.hour24 * 60 + slots.maghrib.min;
  const ishaMin = slots.isha.hour24 * 60 + slots.isha.min;

  if (curMins >= ishaMin || curMins < fajrMin) {
    return "isha";
  }
  if (curMins >= maghribMin) {
    return "maghrib";
  }
  if (curMins >= asrMin) {
    return "asr";
  }
  if (curMins >= dhuhrMin) {
    return "dhuhr";
  }
  return "fajr";
}

export async function getTodayPrayerTimes(zone = "SGR01"): Promise<DailyPrayerSchedule> {
  const now = new Date();
  const dateDisplay = formatMalayDate(now);
  const locationDisplay = "Kita Bayu, Cybersouth";

  try {
    const res = await fetch(`https://api.waktusolat.app/v2/solat/${zone}`, {
      next: { revalidate: 3600 },
    });

    if (res.ok) {
      const data = await res.json();
      const dayOfMonth = now.getDate();
      const todayData = data.prayers?.find(
        (p: { day: number }) => p.day === dayOfMonth
      ) || data.prayers?.[0];

      if (todayData) {
        const fajr = unixToTimeString(todayData.fajr);
        const dhuhr = unixToTimeString(todayData.dhuhr);
        const asr = unixToTimeString(todayData.asr);
        const maghrib = unixToTimeString(todayData.maghrib);
        const isha = unixToTimeString(todayData.isha);

        const slotMap = {
          fajr: { hour24: fajr.hour24, min: fajr.min },
          dhuhr: { hour24: dhuhr.hour24, min: dhuhr.min },
          asr: { hour24: asr.hour24, min: asr.min },
          maghrib: { hour24: maghrib.hour24, min: maghrib.min },
          isha: { hour24: isha.hour24, min: isha.min },
        };

        const activeKey = determineActivePrayer(now, slotMap);

        return {
          zone,
          dateDisplay,
          locationDisplay,
          hijriDate: todayData.hijri,
          activeKey,
          prayers: [
            { key: "fajr", name: "Subuh", time: fajr.time, period: fajr.period, timestamp: todayData.fajr },
            { key: "dhuhr", name: "Zohor", time: dhuhr.time, period: dhuhr.period, timestamp: todayData.dhuhr },
            { key: "asr", name: "Asar", time: asr.time, period: asr.period, timestamp: todayData.asr },
            { key: "maghrib", name: "Maghrib", time: maghrib.time, period: maghrib.period, timestamp: todayData.maghrib },
            { key: "isha", name: "Isyak", time: isha.time, period: isha.period, timestamp: todayData.isha },
          ],
        };
      }
    }
  } catch {
    // Network or fetch fallback
  }

  // Fallback
  const slotMap = {
    fajr: { hour24: DEFAULT_TIMES.fajr.hour24, min: DEFAULT_TIMES.fajr.min },
    dhuhr: { hour24: DEFAULT_TIMES.dhuhr.hour24, min: DEFAULT_TIMES.dhuhr.min },
    asr: { hour24: DEFAULT_TIMES.asr.hour24, min: DEFAULT_TIMES.asr.min },
    maghrib: { hour24: DEFAULT_TIMES.maghrib.hour24, min: DEFAULT_TIMES.maghrib.min },
    isha: { hour24: DEFAULT_TIMES.isha.hour24, min: DEFAULT_TIMES.isha.min },
  };

  const activeKey = determineActivePrayer(now, slotMap);

  return {
    zone,
    dateDisplay,
    locationDisplay,
    activeKey,
    prayers: [
      { key: "fajr", name: "Subuh", time: DEFAULT_TIMES.fajr.time, period: DEFAULT_TIMES.fajr.period },
      { key: "dhuhr", name: "Zohor", time: DEFAULT_TIMES.dhuhr.time, period: DEFAULT_TIMES.dhuhr.period },
      { key: "asr", name: "Asar", time: DEFAULT_TIMES.asr.time, period: DEFAULT_TIMES.asr.period },
      { key: "maghrib", name: "Maghrib", time: DEFAULT_TIMES.maghrib.time, period: DEFAULT_TIMES.maghrib.period },
      { key: "isha", name: "Isyak", time: DEFAULT_TIMES.isha.time, period: DEFAULT_TIMES.isha.period },
    ],
  };
}
