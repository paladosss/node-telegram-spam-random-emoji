import TelegramBot, { Message } from 'node-telegram-bot-api';
import express from 'express';

import { config } from './config';
import emojis from './emojis.json';

const admin = { username: 'paladosss' };
const { token, port, root } = config;

const app = express();
const tgBot = new TelegramBot(token, { polling: true });

const isAdmin = (from: any) => from && from.username === admin.username;
const randEmojis = () => emojis[Math.floor(Math.random() * emojis.length)];
const delay = (ms: number = 1000) => new Promise((res) => setTimeout(res, ms));

app.use(express.json());

app.get('/', (req: any, res: any) => {
  res.send({ status: 'I am alive!' });
});

tgBot.onText(/\/status/, (msg: Message) => {
  console.log('msg', msg);

  tgBot.sendMessage(msg.chat.id, 'I am alive!');
});

tgBot.onText(/\/kill/, async (msg: Message) => {
  console.log('msg', msg);

  const { entities, text, from } = msg;

  if (isAdmin(from) || true) {
    if (text && entities) {
      const { length } = entities[0];
      const params = text.substring(length + 1);
      const [who, how] = params.split(' ');

      if (who && how) {
        for (let i = 0; i < Number(how); i++) {
          await tgBot.sendMessage(msg.chat.id, `${who} ${randEmojis()}`);

          await delay(3100);
        }
      } else {
        tgBot.sendMessage(msg.chat.id, '/kill @username 10');
      }
    }
  }
});

tgBot.on('polling_error', (error: any) => {
  console.log(error.code);
});

app.listen(port, function listen() {
  console.log(`Server is listening at http://localhost:${port}${root}`);
});
