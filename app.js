const
    express = require("express"),
    knex = require("knex"),
    settings = require("./settings"),
    routes = require("./routes"),
    middlewares = require("./middlewares");

let app = express();

// all employee data
let api_router = express.Router();
api_router.get("/employees", routes.employees.list_all_employees);
api_router.get(
    "/employees/:id", 
    middlewares.validate_id, 
    routes.employees.list_single_employee
);

app.use("/api", api_router);

let knex_connect = knex({
    client: "mysql",
    connection: settings.database
});
app.locals.knex = knex_connect;

app.listen(settings.api_server_port, function() {
    console.info(`INFO: server started on http://localhost:${settings.api_server_port}`);
});
