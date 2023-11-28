const { ApolloServer } =require ('@apollo/server');
const { expressMiddleware } =require ('@apollo/server/express4');
const { ApolloServerPluginDrainHttpServer } =require ('@apollo/server/plugin/drainHttpServer');
const express =require ('express');
const http =require ('http');
const cors =require ('cors');
const mongoose= require('mongoose')
const config = require('./config/config')
const typeDefs =require ('./schema/typeDefs');
const resolvers =require ('./resolvers/resolvers');
const app = express();
const User = require("./models/user");


const httpServer = http.createServer(app);

const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

const startServer = async () => {


  await server.start();

  app.use(
    '/',
    cors(),
    express.json(),
      expressMiddleware(server, {
        
      })

);
  await new Promise((resolve) => httpServer.listen({ port: config.port }, resolve));

  console.log(`🚀 Server ready at http://localhost:${config.port}/`);

};

mongoose
      .connect(config.database, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => {
        console.log('db connected');
      })
      .catch((err) => {
        console.error('db not connected', err);
      });

startServer().then();