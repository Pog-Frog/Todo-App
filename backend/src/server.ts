import {App} from "./app";
import {AuthRoute} from "./routes/auth.route";
import {TaskRoute} from "./routes/task.route";
import {CategoryRoute} from "./routes/category.route";


const app = new App([new AuthRoute(), new TaskRoute(), new CategoryRoute()]);

app.listen();