import figlet from 'figlet';

const server = Bun.serve({
  port: 3000,
  fetch(req) {
    const url = new URL(req.url);

    if (url.pathname === '/') {
      const body = figlet.textSync('Culinary Chronicles');
      return new Response(body);
    }
    if (url.pathname === '/about') {
      return new Response('About us');
    }
    if (url.pathname === '/contact') {
      return new Response('Contact us');
    }
  },
});

console.log('Server is running on port 3000');
