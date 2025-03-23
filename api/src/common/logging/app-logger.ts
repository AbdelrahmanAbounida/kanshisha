import { Injectable, ConsoleLogger } from '@nestjs/common';

var colors = {
  Reset: '\x1b[0m',
  Bright: '\x1b[1m',
  Dim: '\x1b[2m',
  Underscore: '\x1b[4m',
  Blink: '\x1b[5m',
  Reverse: '\x1b[7m',
  Hidden: '\x1b[8m',

  FgBlack: '\x1b[30m',
  FgRed: '\x1b[31m',
  FgGreen: '\x1b[32m',
  FgYellow: '\x1b[33m',
  FgBlue: '\x1b[34m',
  FgMagenta: '\x1b[35m',
  FgCyan: '\x1b[36m',
  FgWhite: '\x1b[37m',

  BgBlack: '\x1b[40m',
  BgRed: '\x1b[41m',
  BgGreen: '\x1b[42m',
  BgYellow: '\x1b[43m',
  BgBlue: '\x1b[44m',
  BgMagenta: '\x1b[45m',
  BgCyan: '\x1b[46m',
  BgWhite: '\x1b[47m',
};

@Injectable()
export class CustomLogger extends ConsoleLogger {
  success(message: any) {
    console.log(`${colors.FgGreen}${message}${colors.Reset}`);
  }

  log(message: any) {
    console.log(`${colors.FgWhite}${message}${colors.Reset}`);
  }

  error(message: any, trace?: string) {
    console.error(`${colors.FgRed}${message}${colors.Reset}`, trace);
  }

  warn(message: any) {
    console.warn(`${colors.FgYellow}${message}${colors.Reset}`);
  }

  debug(message: any) {
    console.debug(`${colors.FgBlue}${message}${colors.Reset}`);
  }

  verbose(message: any) {
    super.verbose(`${colors.FgMagenta}${message}${colors.Reset}`);
  }
}
