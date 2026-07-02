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
import { cargarChats, guardarChats } from '../../data/chats';
import type { Mensaje } from '../../data/chats';

const ChatPage = () => {
  const chatsGuardados = cargarChats();

  const grupoActivo = sessionStorage.getItem('grupoActivo')
    ? JSON.parse(sessionStorage.getItem('grupoActivo')!)
    : null;

  const chatInicial = grupoActivo
    ? chatsGuardados.find((c) => c.nombre === grupoActivo.nombre) ||
      chatsGuardados[0]
    : chatsGuardados[0];

  const [chats, setChats] = useState(chatsGuardados);
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
    guardarChats(chatsActualizados);
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
