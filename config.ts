import { Config, EnvironmentType } from './types';

const env = process.env.ENVIRONMENT || 'production';
const port = Number(process.env.PORT) || 9000;
const root = process.env.ROOT || '/';
const token = process.env.TOKEN;

/**
 * Checks if value is EnvironmentType
 * @param value
 * @returns {value is EnvironmentType}
 */
function isEnvironmentType(value: any): value is EnvironmentType {
  const envs: EnvironmentType[] = ['production', 'development'];
  return envs.includes(value);
}

/**
 * Creates error text about incorrect environment variable
 * @param {string} envName
 * @returns {string}
 */
function getErrorText(envName: string) {
  return `Environment variable ${envName} not passed or has incorrect format`;
}

if (!isEnvironmentType(env)) {
  throw new Error(getErrorText('ENVIRONMENT'));
}
if (Number.isNaN(port)) {
  throw new Error(getErrorText('PORT'));
}
if (!root) {
  throw new Error(getErrorText('ROOT'));
}
if (!token) {
  throw new Error(getErrorText('TOKEN'));
}

export const config: Config = {
  env,
  port,
  root,
  token,
};
