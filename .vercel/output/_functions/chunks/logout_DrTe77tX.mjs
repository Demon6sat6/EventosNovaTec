import { c as clearSessionCookie } from './auth_Zqlk1v2P.mjs';

const POST = ({ cookies, redirect }) => {
  clearSessionCookie(cookies);
  return redirect("/admin/login");
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
