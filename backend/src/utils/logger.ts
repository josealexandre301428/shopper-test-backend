const winston = require('winston');

const loggerInfo = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()   

  ),
  transports: [
    new winston.transports.Console()
  ],
});

const loggerErro = winston.createLogger({
    level: 'error', // Registra apenas erros e níveis superiores
    format: winston.format.combine(
      winston.format.timestamp(),
      winston.format.errors({ stack: true }),
      winston.format.json()
    ),
    transports: [
      new winston.transports.File({ filename:   
   'errors.log' })
    ],
  });
  


export { loggerInfo, loggerErro };