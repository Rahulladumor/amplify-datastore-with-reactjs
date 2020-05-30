// @ts-check
import { initSchema, DataStore } from '@aws-amplify/datastore';
import { schema } from './schema';

const { Message } = initSchema(schema);

export { Message };
