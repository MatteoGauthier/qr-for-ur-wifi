export enum Security {
  WPA = "WPA",
  WEP = "WEP",
}

export const wifiQrPayload = (ssid: string, password: string, security: Security) => {
  return `WIFI:S:${ssid};P:${password};T:${security};`
}
