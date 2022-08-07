import React, { useMemo } from 'react';
import { Security } from '../helper/qr';

import QRCodeRenderer from './QRCodeRenderer';

type Props = {
  ssid: string;
  password: string;
  security: Security;
  docRef: React.RefObject<HTMLDivElement>;
};

export default function DocumentViewer({ ssid, password, security, docRef }: Props) {
  return (
    <div ref={docRef} className="doc">
      <span className="doc-title">Code WIFI</span>
      <div className="doc-section">
        <span className="doc-subtitle">Nom du réseau :</span>
        <span className="doc-value">{ssid}</span>
      </div>
      <div className="doc-section">
        <span className="doc-subtitle">Mot de passe :</span>
        <span className="doc-value">{password}</span>
      </div>
      <QRCodeRenderer ssid={ssid} password={password} security={security} />
    </div>
  );
}

function PDFDocument() {}
