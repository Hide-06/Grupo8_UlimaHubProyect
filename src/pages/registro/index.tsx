import {
  TextInput,
  PasswordInput,
  Button,
  Paper,
  Title,
  Text,
  Stack,
  Select,
} from '@mantine/core';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import styles from './Registro.module.css';
import { cargarUsuarios, guardarUsuarios } from '../../data/usuarios';
import type { Usuario } from '../../data/usuarios';

const RegistroPage = () => {
  const navigate = useNavigate();
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmar, setConfirmar] = useState('');
  const [ciclo, setCiclo] = useState('');
  const [error, setError] = useState('');

  const manejarRegistro = () => {
    if (!nombre || !email || !password || !confirmar || !ciclo) {
      setError('Por favor, complete todos los campos');
      return;
    }

    if (password !== confirmar) {
      setError('Las contraseñas no coinciden');
      return;
    }

    if (!email.endsWith('@aloe.ulima.edu.pe')) {
      setError('Debe usar su correo institucional (@aloe.ulima.edu.pe)');
      return;
    }

    const usuarios = cargarUsuarios();

    if (usuarios.some((usuario) => usuario.email === email)) {
      setError('Ese correo ya está registrado');
      return;
    }

    // Por ahora se guarda en localStorage; no hay backend real todavía
    const nuevoUsuario: Usuario = { nombre, email, password, ciclo };
    guardarUsuarios([...usuarios, nuevoUsuario]);

    sessionStorage.setItem('usuario', JSON.stringify({ nombre, email, ciclo }));
    navigate('/home');
  };

  return (
    <div className={styles.contenedor}>
      <Paper className={styles.tarjeta} radius="md" p="xl" withBorder>
        <Stack className={styles.encabezado}>
          <Title order={2}>Ulima Hub</Title>
          <Text c="dimmed" size="sm">
            Crea tu cuenta institucional
          </Text>
        </Stack>

        <Stack gap="sm">
          <TextInput
            label="Nombre completo"
            placeholder="Tu nombre y apellido"
            value={nombre}
            onChange={(e) => setNombre(e.currentTarget.value)}
          />
          <TextInput
            label="Correo institucional"
            placeholder="usuario@aloe.ulima.edu.pe"
            value={email}
            onChange={(e) => setEmail(e.currentTarget.value)}
          />
          <Select
            label="Ciclo"
            placeholder="Selecciona tu ciclo"
            data={['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']}
            value={ciclo}
            onChange={(valor) => setCiclo(valor || '')}
          />
          <PasswordInput
            label="Contraseña"
            placeholder="Crea una contraseña"
            value={password}
            onChange={(e) => setPassword(e.currentTarget.value)}
          />
          <PasswordInput
            label="Confirmar contraseña"
            placeholder="Repite tu contraseña"
            value={confirmar}
            onChange={(e) => setConfirmar(e.currentTarget.value)}
          />

          {error && (
            <Text c="red" size="sm">
              {error}
            </Text>
          )}

          <Button fullWidth mt="sm" onClick={manejarRegistro}>
            Registrarse
          </Button>

          <Text ta="center" size="sm" c="dimmed">
            ¿Ya tienes cuenta?{' '}
            <Text
              component="span"
              c="orange"
              style={{ cursor: 'pointer' }}
              onClick={() => navigate('/')}
            >
              Inicia sesión
            </Text>
          </Text>
        </Stack>
      </Paper>
    </div>
  );
};

export default RegistroPage;
