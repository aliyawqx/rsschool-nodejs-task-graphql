import Fastify from 'fastify';
import mercurius from 'mercurius';
import { schema } from './schemas.js';
import { createContext } from './context.js';

const app = Fastify();

app.register(mercurius, {
  schema,
  context: createContext,
  graphiql: true,
});

app.listen({ port: 3000 }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`🚀 Server ready at ${address}/graphiql`);
});
