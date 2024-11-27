const { createLogger, format, transports } = require("winston");

// Define custom log format
const logFormat = format.printf(({ timestamp, level, message }) => {
    return `${timestamp} [${level.toUpperCase()}]: ${message}`;
});

// Create Winston logger
const logger = createLogger({
    level: "info", // Default log level
    format: format.combine(
        format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
        logFormat
    ),
    transports: [
        // Log to console
        new transports.Console(),
        // Log to a file (for production)
        new transports.File({ filename: "logs/error.log", level: "error" }),
        new transports.File({ filename: "logs/combined.log" }),
    ],
});

// Export logger instance
module.exports = logger;