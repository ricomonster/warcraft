import { fail } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms';
import { zod4 } from 'sveltekit-superforms/adapters';

// Types
import type { PageServerLoad, Actions } from '$routes/habit/create/$types.js';

// Packages
import { db } from '$package/drizzle/server';
import { quests, type InsertQuest } from '$package/quest/store/schema';

// Schema
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
        notes: '',
        target: 1,
        days: [],
        dailyReminder: false,
      }
    }),
  };
};

export const actions: Actions = {
  default: async (event) => {
    const form = await superValidate(event, zod4(createHabitFormSchema));
    if (!form.valid) {
      return fail(400, {
        form,
      });
    }

    const newQuest: InsertQuest = {
      quest: form.data.quest,
      name: form.data.name,
      color: form.data.color,
      icon: form.data.icon,
      difficulty: form.data.difficulty,
      dailyReminder: form.data.dailyReminder,
      remindTimeAt: form.data.remindTimeAt,
      remindDaysAt: form.data.remindDaysAt,
      notes: form.data.notes,
      type: form.data.type,
      days: form.data.days,
      target: form.data.target,
      alignment: form.data.alignment,
    };

    const result = await db.insert(quests).values(newQuest);

    return {
      form,
    };
  },
};
