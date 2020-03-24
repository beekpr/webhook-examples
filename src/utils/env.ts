export function extractEnvironmentVariable(name: string): string {
    const value = process.env[name];
    if (typeof value === 'string') {
        return value;
    } else {
        throw new Error(`Environment variable '${name}' not present.`);
    }
}