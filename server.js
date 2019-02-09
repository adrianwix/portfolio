const Koa = require("koa");
const next = require("next");
const Router = require("koa-router");
const logger = require("koa-logger");
const koaBody = require("koa-body");
require("dotenv").config();

// APIs
const issueTracker = require("./routes/api/issueTracker");

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
	const server = new Koa();
	const router = new Router();

	server.use(logger());

	server.use(koaBody());

	router.use("/api/issues", issueTracker.routes());

	router.get("/a", async ctx => {
		await app.render(ctx.req, ctx.res, "/b", { maldito: "maduro" });
		ctx.respond = false;
	});

	router.get("/b", async ctx => {
		console.log("Koa", ctx.query);
		await app.render(ctx.req, ctx.res, "/a", ctx.query);
		ctx.respond = false;
	});

	router.get("*", async ctx => {
		await handle(ctx.req, ctx.res);
		ctx.respond = false;
	});

	server.use(async (ctx, next) => {
		ctx.res.statusCode = 200;
		await next();
	});

	server.use(router.routes());
	server.listen(port, () => {
		console.log(`> Ready on http://localhost:${port}`);
	});
});
