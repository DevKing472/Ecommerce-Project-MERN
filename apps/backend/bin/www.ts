#!/usr/bin/env node

/**
 * Module dependencies.
 */
import app from '../app.js';
import debugLib from 'debug';
import { createServer } from 'http';
import { connectToMongo } from '../configs/index.js';

const debug = debugLib('eshop:server');

/**
 * Get port from environment and store in Express.
 */
const port = normalizePort(process.env.PORT ?? '3001');
app.set('port', port);

if (typeof process.env.MONGODB_URL === 'string') {
  await connectToMongo(process.env.MONGODB_URL);
} else {
  throw new Error('URL could not be read');
}

/**
 * Create HTTP server.
 */
const server = createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

/**
 * Normalize a port into a number, string, or false.
 * @param {Number} val
 * @return {Number} port
 */
function normalizePort(val: string): number | string | boolean {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 * @param {shape} error
 */
function onError(error: { syscall: string; code: string }): void {
  if (error.syscall !== 'listen') {
    // eslint-disable-next-line @typescript-eslint/no-throw-literal
    throw error;
  }

  const bind =
    typeof port === 'string'
      ? `Pipe ${port.toString()}`
      : `Port ${port.toString()}`;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      // eslint-disable-next-line @typescript-eslint/no-throw-literal
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */
function onListening(): void {
  const addr = server.address() ?? '';
  const bind = typeof addr === 'string' ? `pipe ${addr}` : `port ${addr.port}`;
  debug('Listening on ' + bind);
}
