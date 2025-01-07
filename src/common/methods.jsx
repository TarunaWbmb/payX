export const generateUniqueId = () => {
  const timestamp = Date.now()
  const random = Math.random().toString(36).substring(2, 8)
  return `${timestamp}${random}`
}

export function formatString(str) {
  const formattedString = str.replace(/([a-z])([A-Z])/g, '$1 $2')
  return formattedString.charAt(0).toUpperCase() + formattedString.slice(1)
}

export function formatDate(createdAt) {
  const date = new Date(createdAt)
  const day = String(date.getUTCDate()).padStart(2, '0')
  const month = String(date.getUTCMonth() + 1).padStart(2, '0')
  const year = date.getUTCFullYear()
  const hours = date.getUTCHours()
  const minutes = String(date.getUTCMinutes()).padStart(2, '0')
  const ampm = hours >= 12 ? 'PM' : 'AM'
  const formattedHours = hours % 12 || 12
  return `${day}-${month}-${year}, ${formattedHours}:${minutes} ${ampm} UTC`
}
