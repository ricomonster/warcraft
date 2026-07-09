import { superValidate } from 'sveltekit-superforms';
import { zod4 } from 'sveltekit-superforms/adapters';

// Types
import type { PageServerLoad } from '$routes/habit/create/$types.js';
import { createHabitFormSchema } from './../schema';

// Consts
import {
  COLORS,
  DIFFICULTY,
  ICONS,
} from './../consts';

export const load: PageServerLoad = async () => {
  return {
    form: await superValidate(zod4(createHabitFormSchema), {
      defaults: {
        type: 'daily',
        quest: '',
        name: '',
        color: COLORS[0],
        icon: ICONS[0].name,
        difficulty: DIFFICULTY[1].value,
        reminder: '',
        notes: '',
        target: 1,
        days: [],
      }
    }),
  };
};
