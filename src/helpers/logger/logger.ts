import morgan from 'morgan';
import requestIp from 'request-ip';
import pc from 'picocolors';

export default class Logging {
    private static getFunctionName(): string {
        try {
            const error = new Error();
            const stackTrace = error.stack;

            if (stackTrace) {
                const match = /\s+at\s+([^\s]+)\s+\(/.exec(stackTrace.split('\n')[3]);
                const match2 = /\s+at async\s+([^\s]+)\s+\(/.exec(stackTrace.split('\n')[5]);

                return match === null && match2 === null
                    ? 'Unknown'
                    : match
                    ? match[1]
                    : match2
                    ? match2[1]
                    : 'Unknown';
            } else {
                return 'Unknown';
            }
        } catch (error) {
            // If there's an error (e.g., in strict mode), return a default identifier
            return 'Unknown';
        }
    }

    public static log = (args: any) => this.info(args);
    public static info = (args: any, functionName?: string | undefined) =>
        console.log(
            pc.blue(
                pc.bold(
                    `[${new Date().toDateString()} - ${new Date().toLocaleTimeString()}] [INFO]`
                )
            ),
            pc.magenta(pc.bold(`[${functionName ? functionName : Logging.getFunctionName()}]`)),
            typeof args === 'string' ? pc.green(pc.bold(args)) : args
        );
    public static warn = (args: any, functionName?: string | undefined) =>
        console.log(
            pc.yellow(
                pc.bold(
                    `[${new Date().toDateString()} - ${new Date().toLocaleTimeString()}] [WARN]`
                )
            ),
            pc.magenta(pc.bold(`[${functionName ? functionName : Logging.getFunctionName()}]`)),
            typeof args === 'string' ? pc.yellow(pc.bold(args)) : args
        );
    public static error = (args: any, functionName?: string | undefined) =>
        console.log(
            pc.red(
                pc.bold(
                    `[${new Date().toDateString()} - ${new Date().toLocaleTimeString()}] [ERROR]`
                )
            ),
            pc.magenta(pc.bold(`[${functionName ? functionName : Logging.getFunctionName()}]`)),
            typeof args === 'string' ? pc.red(pc.bold(args)) : args
        );
}

export const logger = morgan((tokens, req, res) => {
    const ip = requestIp.getClientIp(req) as string;
    const status = Number(tokens.status(req, res));
    const resTime = Number(tokens['response-time'](req, res));

    const color =
        status >= 500
            ? 'red'
            : status >= 400
            ? 'yellow'
            : status >= 300
            ? 'blue'
            : status >= 200
            ? 'green'
            : 'gray';

    const labelColor =
        status >= 500 ? 'red' : status >= 400 ? 'yellow' : status >= 200 ? 'green' : 'blue';

    const label =
        status >= 500 ? 'ERROR' : status >= 400 ? 'WARN' : status >= 200 ? 'SUCCESS' : 'INFO';

    const resColor = resTime <= 500 ? 'green' : resTime > 500 && resTime <= 1000 ? 'yellow' : 'red';

    return [
        pc[labelColor](
            pc.bold(
                `[${new Date().toDateString()} - ${new Date().toLocaleTimeString()}] [${label}]`
            )
        ),
        pc.blue(pc.bold(tokens.method(req, res))),
        pc.gray(ip),
        pc[color](pc.bold(status)),
        pc.gray(tokens.url(req, res)),
        pc[resColor](pc.bold(resTime + ' ms')),
    ].join(' ');
});
