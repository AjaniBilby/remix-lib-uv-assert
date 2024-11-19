/// <reference types="node" />
import express from "express";

console.log("isProduction", process.env.NODE_ENV === "production");

const viteDevServer =
	process.env.NODE_ENV === "production"
		? null
		: await import("vite").then((vite) =>
				vite.createServer({
					server: { middlewareMode: true },
				})
			);

const app = express();

// app.use((req, res, next) => {
// 	console.log("Request received");
// 	next();
// });

// Remove this use and the fault stops
app.use(
	viteDevServer
		? viteDevServer.middlewares
		: express.static("build/client")
);

app.all("*", (_, res) => {
	console.log("Alive");
	res.end();
});

app.listen(3000, () => {
	console.log("App listening on http://localhost:3000");
});