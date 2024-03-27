export function timeOfDay() {
  const hour = new Date().getHours();
  if (hour >= 4 && hour <= 11)
    return 'morning';
  if (hour >= 12 && hour <= 16)
    return 'afternoon';
  if (hour >= 17 && hour <= 20)
    return 'evening';
  if (hour >= 21 || hour <= 3)
    return 'night';
}
