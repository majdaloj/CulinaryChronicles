import figlet from 'figlet';

const server = Bun.serve({
  port: 3000,
  fetch(req) {
    const body = figlet.textSync('Culinary Chronicles');
    return new Response(body);
  },
});

console.log('Server is running on port 3000');
