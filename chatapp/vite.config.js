import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import socketIoPlugin from "./plugins/socket.io.plugin";
import socketEvents from "./socket_event";
// fsモジュールのインポートを削除（HTTPS設定を使用しない場合）
import fs from "fs"; // この行を削除またはコメントアウト

export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    plugins: [vue(), socketIoPlugin({ socketEvents })],
    server: {
      host: 'localhost', // ローカルホストに設定
      port: parseInt(env.PORT) || 3000,
      // HTTPSが不要な場合は以下の設定を削除またはコメントアウト
      // https: {
      //   key: fs.readFileSync("/etc/ssl/private.key"),
      //   cert: fs.readFileSync("/etc/ssl/certificate.crt")
      // }
    }
  };
});

