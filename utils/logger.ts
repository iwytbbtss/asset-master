import pino from 'pino';
import PinoPretty from 'pino-pretty';

const logger = pino(
  {
    timestamp: pino.stdTimeFunctions.isoTime,
  },
  PinoPretty({
    colorize: true,
  }),
);

export default logger;
