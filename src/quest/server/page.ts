import { fail, redirect } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms';
import { zod4 } from 'sveltekit-superforms/adapters';

// Types
import type { PageServerLoad, Actions } from '$routes/quest/create/$types.js';
import type { InsertQuest } from '$package/quest';

// Packages
import { db } from '$package/drizzle/server';
import { quests } from '$package/quest/store/schema';

// Schema
import { createQuestFormSchema } from './../schema';

// Consts
import {
  COLORS,
  DIFFICULTY_VALUES,
  ICONS,
} from './../consts';

const DEFAULT_FORM = superValidate(zod4(createQuestFormSchema), {
  defaults: {
    type: 'daily',
    quest: '',
    name: '',
    color: COLORS[0],
    icon: ICONS[0].name,
    difficulty: DIFFICULTY_VALUES[1],
    notes: '',
    target: 1,
    days: [],
    dailyReminder: false,
  }
});

export const load: PageServerLoad = async () => {
  return {
    form: await DEFAULT_FORM,
  };
};

export const actions: Actions = {
  default: async (event) => {
    const form = await superValidate(event, zod4(createQuestFormSchema));
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
    };

    switch (form.data.type) {
      case 'daily': {
        newQuest.days = form.data.days;
        newQuest.target = form.data.target;
        break;
      }

      case 'habit': {
        newQuest.alignment = form.data.alignment;
        newQuest.target = form.data.target;
        break;
      }

      case 'todo': {
        newQuest.timeframe = form.data.timeframe;
        newQuest.dueDate = form.data.dueDate;
      }
    }

    await db.insert(quests).values(newQuest);

    throw redirect(303, '/habit');
  },
};
