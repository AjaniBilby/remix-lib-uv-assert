/// <reference types="node" />
/* eslint-disable */
import { createRequestHandler } from "@remix-run/express";
import express from "express";
import morgan from "morgan";

const viteDevServer =
	process.env.NODE_ENV === "production"
		? null
		: await import("vite").then((vite) =>
				vite.createServer({
					server: { middlewareMode: true },
				})
			);

const app = express();
app.use(
	viteDevServer
		? viteDevServer.middlewares
		: express.static("build/client")
);
app.use(morgan("tiny"));

const build = viteDevServer
	? () =>
			viteDevServer.ssrLoadModule(
				"virtual:remix/server-build"
			)
	: await import("./build/server/index.js");


const handler = createRequestHandler({ build })
app.all("*", (req, res) => {
	console.log(34);
	process.stdout.write('Hello\n');
	handler(req, res);
});

const server = app.listen(3000, () => {
	console.log("App listening on http://localhost:3000");
});

const shutdown = () => {
	console.log("Shutting down server...");

	// Close the server gracefully
	server.close((err) => {
		if (err) {
			console.error("Error during server shutdown:", err);
			process.exit(1);
		}
		console.log("Server shut down gracefully.");
		process.exit(0);
	});
};

process.on('SIGTERM', shutdown);
process.on('SIGHUP', shutdown);