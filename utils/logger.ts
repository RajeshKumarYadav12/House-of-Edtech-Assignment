type LogLevel = 'info' | 'warn' | 'error' | 'debug';

interface LogMessage {
  level: LogLevel;
  message: string;
  timestamp: string;
  context?: any;
}

class Logger {
  private isDevelopment: boolean;

  constructor() {
    this.isDevelopment = process.env.NODE_ENV === 'development';
  }

  private formatMessage(level: LogLevel, message: string, context?: any): LogMessage {
    return {
      level,
      message,
      timestamp: new Date().toISOString(),
      context,
    };
  }

  info(message: string, context?: any): void {
    const logMessage = this.formatMessage('info', message, context);
    if (this.isDevelopment) {
      console.log(`[INFO] ${logMessage.timestamp}:`, message, context || '');
    }
  }

  warn(message: string, context?: any): void {
    const logMessage = this.formatMessage('warn', message, context);
    console.warn(`[WARN] ${logMessage.timestamp}:`, message, context || '');
  }

  error(message: string, error?: any): void {
    const logMessage = this.formatMessage('error', message, error);
    console.error(`[ERROR] ${logMessage.timestamp}:`, message, error || '');
  }

  debug(message: string, context?: any): void {
    if (this.isDevelopment) {
      const logMessage = this.formatMessage('debug', message, context);
      console.debug(`[DEBUG] ${logMessage.timestamp}:`, message, context || '');
    }
  }
}

export const logger = new Logger();
export default logger;
