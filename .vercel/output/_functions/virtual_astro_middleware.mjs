import { a8 as defineMiddleware, ah as sequence } from './chunks/sequence_jkwZ4rKh.mjs';
import 'piccolore';
import 'clsx';
import { i as isAuthenticated } from './chunks/auth_Zqlk1v2P.mjs';

const onRequest$1 = defineMiddleware((context, next) => {
  const { pathname } = context.url;
  if (pathname.startsWith("/admin") && pathname !== "/admin/login") {
    if (!isAuthenticated(context.cookies)) {
      return context.redirect("/admin/login");
    }
  }
  return next();
});

const onRequest = sequence(
	
	onRequest$1
	
);

export { onRequest };
