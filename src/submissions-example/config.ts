import { extractEnvironmentVariable } from '../utils/env';
import { Config } from './handler';

export function getConfig(): Config {
    return {
        tenantURL: extractEnvironmentVariable('BKPR_TENANT_URL'),
        token: extractEnvironmentVariable('BKPR_BOT_TOKEN'),
        streamId: Number.parseInt(extractEnvironmentVariable('BKPR_STREAM_ID')),
    }
}
