import taskRouter from "./api/routes/Task.routes";
import App from "./app";

const server = new App();

server.addRouter(taskRouter.router);

server.start();