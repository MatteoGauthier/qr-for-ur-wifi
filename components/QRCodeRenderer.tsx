/* eslint-disable @next/next/no-img-element */
import QRious from 'qrious';
import { useEffect, useState } from 'react';
import { Security, wifiQrPayload } from '../helper/qr';

type QRCodeRendererProps = {
  ssid: string;
  password: string;
  security: Security;
};


export default function QRCodeRenderer({
  password,
  ssid,
  security,
}: QRCodeRendererProps) {
  const [qrCode, setQrCode] = useState(null);
  const payload = wifiQrPayload(ssid, password, security);

  useEffect(() => {
    const qrCode = new QRious({
      value: payload,
      size: 300,
    });

    setQrCode(qrCode.toDataURL());
  }, [payload]);

  return (
    <>
      <img src={qrCode} alt="QR Code generated" />
    </>
  );
}
