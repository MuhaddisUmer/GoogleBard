import express from "express";
import { Bard } from "../dist/index.js";

const server = express();
server.use(express.json());

let cookies = `NID=; SID=; __Secure-1PSID=YwgB5fzSJXty5aAWAVvaQbmB61eLZ-FJqScw7rzdIdxsSyKLyn0305On6IboG12DHsDhew.; __Secure-3PSID=; HSID=; SSID=; APISID=; SAPISID=; __Secure-1PAPISID=; __Secure-3PAPISID=; SIDCC=; __Secure-1PSIDCC=; __Secure-3PSIDCC=`;
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
    const { prompt, conversationId } = req['body'];
    let response = await bot.ask(prompt, conversationId);
    res.status(200).send(response);
  } catch(e) {res.status(400).send({})}
});

let port = 8888;
server.listen(port, () => console.log(`listening to ${port}`));