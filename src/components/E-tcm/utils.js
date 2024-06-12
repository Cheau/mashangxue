export const formatRange = (range) => Array.isArray(range) ? range.join('~') : range

export const padTime = (num) => String(num).padStart(2, '0')
