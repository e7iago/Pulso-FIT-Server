import "dotenv/config";
import app from "./src/index.js";

const port = process.env["PORT"];

app.listen(port, () => {
    console.log(`Servidor executando em http://localhost:${port}`);
})

