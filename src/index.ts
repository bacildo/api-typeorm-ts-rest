import { App } from "./initialization/index";

(async () => {
  const application = new App();
  const server = await application.appInitialize();

  server.start();
})();
