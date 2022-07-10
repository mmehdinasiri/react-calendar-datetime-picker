export const toPersianNumber = (englishNumber: number | string): string => {
  if (!englishNumber) return ''

  const persianNumber = String(englishNumber).replace(
    /\d/g,
    (d) => '۰۱۲۳۴۵۶۷۸۹'[d]
  )
  return persianNumber
}
