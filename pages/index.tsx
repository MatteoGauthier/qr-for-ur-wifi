import {
  Button,
  Container,
  Grid,
  Group,
  Input,
  Select,
  Stack,
  Text,
} from '@mantine/core';
import { toJpeg } from 'html-to-image';
import dynamic from 'next/dynamic';
import { useCallback, useRef, useState } from 'react';
import SEO from '../components/SEO';
import AlertIcon from '../components/svg/AlertIcon';
import DownloadIcon from '../components/svg/DownloadIcon';
import PasswordIcon from '../components/svg/PasswordIcon';
import PrinterIcon from '../components/svg/PrinterIcon';
import WifiIcon from '../components/svg/WifiIcon';
import { Security } from '../helper/qr';

const DocumentViewer = dynamic(() => import('../components/DocumentViewer'), {
  ssr: false,
});

type FormResult = {
  ssid: string;
  password: string;
  security: Security;
};

export default function Home() {
  const [formResult, setFormResult] = useState<FormResult>({
    ssid: 'BBOX-4567854678986',
    password: 'nB8_8zvNTzLUChjbBraOY',
    security: Security.WPA,
  });

  const docRef = useRef<HTMLDivElement>(null);

  // Update formResult directly when inputs change
  const handleSsidChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormResult((prev) => ({
      ...prev,
      ssid: e.currentTarget.value,
    }));
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormResult((prev) => ({
      ...prev,
      password: e.currentTarget.value,
    }));
  };

  const handleSecurityChange = (value: string | null) => {
    setFormResult((prev) => ({
      ...prev,
      security: value as Security, // Cast to Security type
    }));
  };

  const handleDownload = useCallback(() => {
    toJpeg(docRef.current, { cacheBust: true })
      .then((dataUrl) => {
        const link = document.createElement('a');
        link.download = 'my-image-name.png';
        link.href = dataUrl;
        link.click();
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handlePrint = useCallback(() => {
    window.print();
  }, []);

  return (
    <Container>
      <SEO />
      <Grid
        sx={{
          marginTop: '3rem',
        }}
      >
        <Grid.Col className="col" md={6}>
          <Text component="h1" size={'xl'}>
            Créer un QR Code pour votre réseau WIFI
          </Text>
          <Text component="h2" weight={'normal'} mb="md">
            Grace à un QR Code connecter vous plus rapidement à un réseaux WiFi,
            vous scanner le code et vous êtes connecté 🔥
          </Text>
          <Stack spacing="md">
            <Input.Wrapper id="ssid" required label="Le nom du réseau (SSID)">
              <Input
                icon={<WifiIcon />}
                id="ssid"
                placeholder="BBOX-4567854678986"
                value={formResult.ssid}
                onChange={handleSsidChange}
                required
              />
            </Input.Wrapper>
            <Input.Wrapper
              id="password"
              required
              description="Le mot de passe fait minimum 9 caractères"
              label="Le mot de passe du réseau"
            >
              <Input
                icon={<PasswordIcon />}
                required
                id="password"
                placeholder="nB8_8zvNTzLUChjbBraOY"
                value={formResult.password}
                onChange={handlePasswordChange}
              />
            </Input.Wrapper>
            <Input.Wrapper
              id="security"
              required
              label="Le type de sécurité du réseau"
            >
              <Select
                id="security"
                icon={<AlertIcon />}
                value={formResult.security}
                onChange={handleSecurityChange}
                data={[
                  { value: 'WPA', label: 'WPA/WPA2/WPA3 (Le plus courant)' },
                  { value: 'WEP', label: 'WEP' },
                ]}
              />
            </Input.Wrapper>
          </Stack>
        </Grid.Col>
        <Grid.Col md={6}>
          <Stack>
            <DocumentViewer docRef={docRef} {...formResult} />
            <Group>
              <Button
                onClick={handlePrint}
                variant="filled"
                leftIcon={<PrinterIcon />}
              >
                Imprimer le document
              </Button>
              <Button
                onClick={handleDownload}
                variant="outline"
                leftIcon={<DownloadIcon />}
              >
                Télécharger le document
              </Button>
            </Group>
          </Stack>
        </Grid.Col>
      </Grid>
    </Container>
  );
}
