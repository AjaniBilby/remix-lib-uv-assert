import { isRouteErrorResponse, Links, Meta, Outlet, Scripts, ScrollRestoration, useRouteError } from "@remix-run/react";
import { LinksFunction, MetaFunction } from "@remix-run/node";

export const links: LinksFunction = () => {
	return [];
};

export const meta: MetaFunction = () => [
	{ title: "Test" },
	{ name: "robots", content: "noindex" }
];

export async function loader () {
	return {}
}

export default function App() {
	return <html lang="en" >
		<head>
			<meta charSet="utf-8" />
			<meta name="viewport" content="width=device-width, initial-scale=1" />
			<Meta />
			<Links />
		</head>
		<body>
			Hello World
			<Outlet/>
			<ScrollRestoration />
			<Scripts />
		</body>
	</html>;
}




export function ErrorBoundary() {
	return <html lang="en" >
	<head>
		<meta charSet="utf-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1" />
		<meta name="theme-color" content="#dc2626" />
		<Meta />
		<Links />
	</head>
	<body>
		<div style={{
			display: "flex",
			alignItems: "center",
			justifyContent: "center",
			height: "100%",
		}}>
			<div className="card" style={{
				whiteSpace: "pre-wrap",
				padding: "1rem 1.5rem",
			}}>
				<ErrorBody />
			</div>
		</div>
		<ScrollRestoration />
		<Scripts />
	</body>
</html>;
}

function ErrorBody() {
	const error = useRouteError();
	console.error(error);

	if (isRouteErrorResponse(error)) {
		return <>
			<h1 style={{ marginTop: 0 }}>{error.status} {error.statusText}</h1>
			<p>{error.data}</p>
		</>
	} else if (error instanceof Error) {
		return <>
			<h1 style={{ marginTop: 0 }}>Error</h1>
			<p>{error.message}</p>
			<p>Stack trace</p>
			<pre>{error.stack}</pre>
		</>
	} else {
		return <>
			<h1 style={{ marginTop: 0 }}>Error</h1>
		</>
	}
}