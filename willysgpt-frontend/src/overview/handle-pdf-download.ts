export const handlePdfDownload = (
  pdfBlob: Blob | null,
  filename = 'ReceiptId'
) => {
  if (!pdfBlob) {
    console.error('No PDF Blob available to download.')
    return
  }

  const pdfUrl = window.URL.createObjectURL(pdfBlob)

  const downloadLink = document.createElement('a')
  downloadLink.href = pdfUrl
  downloadLink.download = filename || 'download.pdf'
  document.body.appendChild(downloadLink)
  downloadLink.click()

  window.URL.revokeObjectURL(pdfUrl)
  document.body.removeChild(downloadLink)
}
