const { app } = require("./app");
const { PORT = 9090 } = process.ENV;
app.listen(PORT, () => console.log(`Listening on port ${PORT}...`));
