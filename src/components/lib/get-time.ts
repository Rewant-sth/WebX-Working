// Countdown Utility
export const getTimeLeft = (endDate: string | Date | null) => {
    if (!endDate) return { total: -1, days: 0, hours: 0, minutes: 0, seconds: 0 };

    const end = new Date(endDate).getTime();
    const now = Date.now();
    const total = end - now;

    if (total <= 0) {
        return { total: -1, days: 0, hours: 0, minutes: 0, seconds: 0 };
    }
    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
    const days = Math.floor(total / (1000 * 60 * 60 * 24));

    return { total, days, hours, minutes, seconds };
};