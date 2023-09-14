export const toPersianNumber = (englishNumber: number | string): string => {
  if (!englishNumber) return ''

  const persianNumber = String(englishNumber).replace(
    /\d/g,
    (d:any) => '۰۱۲۳۴۵۶۷۸۹'[d]
  )
  return persianNumber
}
