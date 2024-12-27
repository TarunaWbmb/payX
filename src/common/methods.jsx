export const generateUniqueId = () => {
  const timestamp = Date.now()
  const random = Math.random().toString(36).substring(2, 8)
  return `${timestamp}${random}`
}

export function formatString(str) {
  const formattedString = str.replace(/([a-z])([A-Z])/g, '$1 $2')
  return formattedString.charAt(0).toUpperCase() + formattedString.slice(1)
}
