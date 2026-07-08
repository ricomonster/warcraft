import { superValidate } from 'sveltekit-superforms';
import { zod4 } from 'sveltekit-superforms/adapters';

// Types
import type { PageServerLoad } from '$routes/habit/create/$types.js';
import { createHabitFormSchema } from './../schema';

export const load: PageServerLoad = async () => {
  return {
    form: await superValidate(zod4(createHabitFormSchema)),
  };
};
