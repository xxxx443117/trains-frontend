import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import postCssPxToRem from "postcss-pxtorem";
import autoprefixer from "autoprefixer";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const envs = { ...process.env, ...loadEnv(mode, process.cwd()) };

  // console.log(envs);
  // HTTPS_DEV
  return {
    plugins: [vue()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src")
      }
    },
    server: {
      port: 5173,
      host: "0.0.0.0",
      open: true,
      proxy: {
        "/api": {
          target: envs.VITE_BASE_API_URL,
          changeOrigin: true,
          rewrite: (p: string) => p.replace(/^\/api/, "")
        }
      }
    },
    css: {
      postcss: {
        plugins: [
          postCssPxToRem({
            // 自适应，px>rem转换
            rootValue: 37.5, // 1rem的大小
            propList: ["*"] // 需要转换的属性，这里选择全部都进行转换
          }),
          autoprefixer({
            // 自动添加前缀
            overrideBrowserslist: [
              "Android 4.1",
              "iOS 7.1",
              "Chrome > 31",
              "ff > 31",
              "ie >= 8"
              //'last 2 versions', // 所有主流浏览器最近2个版本
            ],
            grid: true
          })
        ]
      }
    }
  };
});
