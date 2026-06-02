import {
  Card,
  Text,
  Title,
  TextInput,
  Button,
  ScrollArea,
} from '@mantine/core';
import { useState } from 'react';
import { Send } from 'lucide-react';
import styles from './Chat.module.css';

interface Mensaje {
  id: number;
  autor: string;
  texto: string;
  hora: string;
  propio: boolean;
}

interface Chat {
  id: number;
  nombre: string;
  tipo: 'grupo' | 'personal';
  mensajes: Mensaje[];
}

const CHATS: Chat[] = [
  {
    id: 1,
    nombre: 'Grupo PW - Proyecto Final',
    tipo: 'grupo',
    mensajes: [
      {
        id: 1,
        autor: 'Carlos',
        texto: '¿Ya terminaron la parte del login?',
        hora: '10:00',
        propio: false,
      },
      {
        id: 2,
        autor: 'María',
        texto: 'Sí, ya lo subí al repo',
        hora: '10:05',
        propio: false,
      },
      {
        id: 3,
        autor: 'Yo',
        texto: 'Perfecto, ahora hago el dashboard',
        hora: '10:10',
        propio: true,
      },
    ],
  },
  {
    id: 2,
    nombre: 'Economía - Casos',
    tipo: 'grupo',
    mensajes: [
      {
        id: 1,
        autor: 'Luis',
        texto: '¿Cuándo nos reunimos para el caso?',
        hora: '09:00',
        propio: false,
      },
      {
        id: 2,
        autor: 'Yo',
        texto: 'El jueves a las 5pm?',
        hora: '09:05',
        propio: true,
      },
      {
        id: 3,
        autor: 'Luis',
        texto: 'Dale, perfecto',
        hora: '09:10',
        propio: false,
      },
    ],
  },
  {
    id: 3,
    nombre: 'Carlos',
    tipo: 'personal',
    mensajes: [
      {
        id: 1,
        autor: 'Carlos',
        texto: '¿Me pasas los apuntes de BD?',
        hora: '08:00',
        propio: false,
      },
      {
        id: 2,
        autor: 'Yo',
        texto: 'Claro, te los mando ahora',
        hora: '08:05',
        propio: true,
      },
    ],
  },
];

const ChatPage = () => {
  const grupoActivo = sessionStorage.getItem('grupoActivo')
    ? JSON.parse(sessionStorage.getItem('grupoActivo')!)
    : null;

  const chatInicial = grupoActivo
    ? CHATS.find((c) => c.nombre === grupoActivo.nombre) || CHATS[0]
    : CHATS[0];

  const [chats, setChats] = useState(CHATS);
  const [chatSeleccionado, setChatSeleccionado] = useState(chatInicial);
  const [mensaje, setMensaje] = useState('');

  const enviarMensaje = () => {
    if (!mensaje.trim()) return;

    const nuevoMensaje: Mensaje = {
      id: Date.now(),
      autor: 'Yo',
      texto: mensaje,
      hora: new Date().toLocaleTimeString('es-PE', {
        hour: '2-digit',
        minute: '2-digit',
      }),
      propio: true,
    };

    const chatsActualizados = chats.map((c) =>
      c.id === chatSeleccionado.id
        ? { ...c, mensajes: [...c.mensajes, nuevoMensaje] }
        : c
    );

    setChats(chatsActualizados);
    setChatSeleccionado(
      chatsActualizados.find((c) => c.id === chatSeleccionado.id)!
    );
    setMensaje('');
  };

  return (
    <div className={styles.contenedor}>
      {/* sidebar de chats */}
      <Card withBorder radius="md" className={styles.sidebar} padding="md">
        <Title order={4} mb="md">
          Chats
        </Title>
        {chats.map((chat) => (
          <div
            key={chat.id}
            className={`${styles.chatItem} ${chat.id === chatSeleccionado.id ? styles.chatItemActivo : ''}`}
            onClick={() => setChatSeleccionado(chat)}
          >
            <Text fw={600} size="sm">
              {chat.nombre}
            </Text>
            <Text size="xs" c="dimmed">
              {chat.tipo === 'grupo' ? '👥 Grupo' : '👤 Personal'}
            </Text>
          </div>
        ))}
      </Card>

      {/* panel de mensajes */}
      <Card withBorder radius="md" className={styles.chatActivo} padding={0}>
        {/* header del chat */}
        <div
          style={{ padding: '12px 16px', borderBottom: '1px solid #373a40' }}
        >
          <Title order={4}>{chatSeleccionado.nombre}</Title>
          <Text size="xs" c="dimmed">
            {chatSeleccionado.tipo === 'grupo'
              ? 'Grupo de estudio'
              : 'Chat personal'}
          </Text>
        </div>

        {/* mensajes */}
        <ScrollArea className={styles.mensajes}>
          {chatSeleccionado.mensajes.map((msg) => (
            <div
              key={msg.id}
              className={msg.propio ? styles.mensajePropio : styles.mensajeOtro}
            >
              {!msg.propio && (
                <div className={styles.nombreMensaje}>{msg.autor}</div>
              )}
              <Text size="sm">{msg.texto}</Text>
              <Text size="xs" opacity={0.7} ta="right">
                {msg.hora}
              </Text>
            </div>
          ))}
        </ScrollArea>

        {/* input */}
        <div className={styles.inputArea}>
          <TextInput
            placeholder="Escribe un mensaje..."
            value={mensaje}
            onChange={(e) => setMensaje(e.currentTarget.value)}
            onKeyDown={(e) => e.key === 'Enter' && enviarMensaje()}
            style={{ flex: 1 }}
          />
          <Button onClick={enviarMensaje} leftSection={<Send size={16} />}>
            Enviar
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default ChatPage;
