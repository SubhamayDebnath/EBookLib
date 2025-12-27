import app from "./src/app.js";
import { config } from "./src/config/config.js";
import databaseConnection from "./src/config/database.js";

// Function to start the server
const startServer = () => {
	const PORT = config.port;
	app.listen(PORT, () =>
		console.log(`Server running on port: http://localhost:${PORT}`)
	);
};
// connect to database and then start the server
databaseConnection()
	.then(startServer)
	.catch((error) => console.log(`error: ${error}`));
