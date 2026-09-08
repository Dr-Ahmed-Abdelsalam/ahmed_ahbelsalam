export default {
  async fetch(request: Request): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname === '/api/health') {
      return Response.json({
        ok: true,
        site: 'Dr. Ahmed Abdelsalam',
        runtime: 'Cloudflare Workers',
      });
    }

    return new Response('Not found', { status: 404 });
  },
};