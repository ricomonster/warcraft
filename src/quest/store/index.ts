// Types
import type { Result } from '$lib/types';
import type { SelectQuest } from './schema';

// Packages
import { db } from '$package/drizzle/server';

export const create = (): Promise<Result<SelectQuest>> => {};
