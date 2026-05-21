import { defineMiddleware } from "astro:middleware";

export const onRequest = defineMiddleware(async (context, next) => {
  const response = await next();

  if (response.status === 404) {
    const shortenerHost = import.meta.env.URL_SHORTNER_HOST;
    if (shortenerHost) {
      const target = new URL(context.url.pathname, shortenerHost);
      return context.redirect(target.toString(), 302);
    }
  }

  return response;
});
