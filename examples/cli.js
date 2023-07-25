import express from "express";
import bodyParser from 'body-parser';

import { Bard } from "../dist/index.js";

const server = express();
// server.use(express.json());
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: false }));

let cookies = `NID=; SID=; __Secure-1PSID=ZAgB5Ylx2tNAcLOHf1RG9Rs2_GeIHQvw7A1vSGsDz92Ae9sh7RZU0EVH1VmToK-s6LMBXg.; __Secure-3PSID=; HSID=; SSID=; APISID=; SAPISID=; __Secure-1PAPISID=; __Secure-3PAPISID=; SIDCC=; __Secure-1PSIDCC=; __Secure-3PSIDCC=`;
let bot = new Bard(cookies, {
  // proxy: {  // optional
  //   host: process.env.PROXY_HOST,
  //   port: process.env.PROXY_PORT,
  //   auth: {
  //     username: process.env.PROXY_USERNAME,
  //     password: process.env.PROXY_PASSWORD
  //   },
  //   protocol: process.env.PROXY_PROTOCOL
  // }
});

server.post("/ask", async (req, res) => {
  try {
    console.log('request = ', req['body']);
    const { prompt, conversationId } = req['body'];
    let responses = await bot.ask(prompt, conversationId);
    console.log('responses = ', responses);
    res.status(200).send(responses);
  } catch(e) {res.status(400).send({})}
});

server.get("/ask", async (req, res) => {
  try {
    let response = await bot.ask('Can you give me top new for today?');
    res.status(200).send(response);
  } catch(e) {res.status(400).send({})}
});

let port = 8888;
server.listen(port, () => console.log(`listening to ${port}`));