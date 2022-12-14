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
import { SyntheticEvent, useCallback, useRef, useState } from 'react';
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

  const handleSubmit = useCallback((e: SyntheticEvent) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      ssid: { value: string };
      password: { value: string };
      security: { value: string };
    };

    setFormResult({
      ssid: target.ssid.value,
      password: target.password.value,
      security: target.security.value as Security,
    });
  }, []);

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
            Cr??er un QR Code pour votre r??seau WIFI
          </Text>
          <Text component="h2" weight={'normal'} mb="md">
            Grace ?? un QR Code connecter vous plus rapidement ?? un r??seaux WiFi,
            vous scanner le code et vous ??tes connect?? ????
          </Text>
          <form onSubmit={handleSubmit}>
            <Stack spacing="md">
              <Input.Wrapper id="ssid" required label="Le nom du r??seau (SSID)">
                <Input
                  icon={<WifiIcon />}
                  id="ssid"
                  placeholder="BBOX-4567854678986"
                  required
                />
              </Input.Wrapper>
              <Input.Wrapper
                id="password"
                required
                description="Le mot de passe fait minimum 9 caract??res"
                label="Le mot de passe du r??seau"
              >
                <Input
                  icon={<PasswordIcon />}
                  required
                  id="password"
                  placeholder="nB8_8zvNTzLUChjbBraOY"
                />
              </Input.Wrapper>
              <Input.Wrapper
                id="security"
                required
                label="Le type de s??curit?? du r??seau"
              >
                <Select
                  id="security"
                  icon={<AlertIcon />}
                  defaultValue="WPA"
                  data={[
                    { value: 'WPA', label: 'WPA/WPA2/WPA3 (Le plus courrant)' },
                    { value: 'WEP', label: 'WEP' },
                  ]}
                />
              </Input.Wrapper>

              <Button
                variant="gradient"
                gradient={{ from: 'teal', to: 'blue', deg: 60 }}
                type={'submit'}
              >
                G??n??rer un QR Code
              </Button>
            </Stack>
          </form>
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
                T??l??charger le document
              </Button>
            </Group>
          </Stack>
        </Grid.Col>
      </Grid>
    </Container>
  );
}
