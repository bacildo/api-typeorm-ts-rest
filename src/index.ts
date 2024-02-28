import { App } from "./initialization/index";

(async () => {
  const application = new App();
  await application.appInitialize();
})();
