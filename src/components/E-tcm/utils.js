export const formatRange = (range) => Array.isArray(range) ? range.join('~') : range

export const padTime = (num) => String(num).padStart(2, '0')

export const hoursToDozens = (hours) => hours * 12

const dozensOfDay = hoursToDozens(24)

export const dozensToTime = (seconds) => {
  const remainder = seconds % dozensOfDay
  const hour = Math.trunc(remainder / 12)
  const minute = remainder % 12 * 5
  return `${padTime(hour)}:${padTime(minute)}`
}

export const timeToDozens = (time) => {
  const [hour, minute] = time.split(':')
  return hoursToDozens(Number(hour)) + Math.round(Number(minute) / 5)
}
