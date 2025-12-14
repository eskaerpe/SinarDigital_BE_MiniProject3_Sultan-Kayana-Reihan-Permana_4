// initializing express app
const app = require("./src/app");
const config = require("./src/config/app.config.js");
const PORT = config.port;

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
