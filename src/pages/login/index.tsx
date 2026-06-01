import {
  TextInput,
  PasswordInput,
  Button,
  Paper,
  Title,
  Text,
  Stack,
  Anchor,
} from '@mantine/core';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import styles from './Login.module.css';

const USUARIOS = [
  { email: 'usuario1@aloe.ulima.edu.pe', password: '1234', nombre: 'Carlos' },
  { email: 'usuario2@aloe.ulima.edu.pe', password: '5678', nombre: 'María' },
  {
    email: 'admin@aloe.ulima.edu.pe',
    password: 'admin',
    nombre: 'Administrador',
  },
];

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const manejarLogin = () => {
    if (!email || !password) {
      setError('Por favor, complete todos los campos');
      return;
    }

    const usuarioEncontrado = USUARIOS.find(
      (usuario) => usuario.email === email && usuario.password === password
    );

    if (!usuarioEncontrado) {
      setError('Correo electrónico o contraseña incorrectos');
      return;
    }

    sessionStorage.setItem('usuario', JSON.stringify(usuarioEncontrado));
    navigate('/home');
  };
  return (
    <div className={styles.contenedor}>
      <Paper className={styles.tarjeta} radius="md" p="xl" withBorder>
        <Stack className={styles.encabezado}>
          <Title order={2}>UlimaHub</Title>
          <Text color="dimmed">Inicia sesión para continuar</Text>
        </Stack>

        <Stack>
          <TextInput
            label="Correo electrónico"
            placeholder="Ingrese su correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.currentTarget.value)}
          />
          <PasswordInput
            label="Contraseña"
            placeholder="Ingrese su contraseña"
            value={password}
            onChange={(e) => setPassword(e.currentTarget.value)}
          />
          {error && <Text color="red">{error}</Text>}
          <Button fullWidth mt="sm" onClick={manejarLogin}>
            Iniciar sesión
          </Button>
          <Text ta="center" size="sm" color="dimmed">
            ¿No tienes una cuenta? <Anchor href="/register">Regístrate</Anchor>
          </Text>
        </Stack>
      </Paper>
    </div>
  );
};
export default LoginPage;
