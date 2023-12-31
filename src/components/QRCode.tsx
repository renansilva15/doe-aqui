// components/QRCode.js
'use client'
import QRCode from 'qrcode.react'

const QRCodeComponent = ({ qrCodeData }: any) => {
  return (
    <div>
      <QRCode value={qrCodeData} />
    </div>
  )
}

export default QRCodeComponent
