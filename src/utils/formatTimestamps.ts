export function formatTimestamp(main: string, delta?: string): string {
  if (!main) return ''
  const mainDate = new Date(main)
  const deltaDate = delta ? new Date(delta) : null

  const mainStr = mainDate.toLocaleString('ro-RO', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })

  if (!deltaDate) return mainStr

  const sameDay =
    mainDate.getFullYear() === deltaDate.getFullYear() &&
    mainDate.getMonth() === deltaDate.getMonth() &&
    mainDate.getDate() === deltaDate.getDate()

  const deltaStr = sameDay
    ? `la ${deltaDate.toLocaleTimeString('ro-RO', {
      hour: '2-digit',
      minute: '2-digit'
    })}`
    : deltaDate.toLocaleString('ro-RO', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })

  return `${mainStr} (Verificat${sameDay ? ' ' : ': '}${deltaStr})`
}
