<script lang="ts" module>
</script>

<script lang="ts">
  import { Circle, CircleCheck } from '@lucide/svelte';
  import { faker } from '@faker-js/faker';

  // Packages
  import { Badge } from '$lib/components/ui/badge';
  import * as Card from '$lib/components/ui/card';

  // Lib
  import { cn } from '$lib/utils';

  import HabitDifficultyBadge from './difficulty.badge.svelte';

  import { ALL_ICONS } from './consts';

  const index = Math.floor(Math.random() * ALL_ICONS.length);
  const icon = $state(ALL_ICONS[index]);

  const completed = $state(faker.datatype.boolean({ probability: 0.5 }));
  const title = $state(faker.lorem.words());
  const difficulty = faker.helpers.weightedArrayElement([
    {weight: 1, value: 'easy'},
    {weight: 1, value: 'medium'},
    {weight: 1, value: 'hard'},
  ]);
  const xp = faker.helpers.weightedArrayElement([
    {weight: 1, value: '10'},
    {weight: 1, value: '30'},
    {weight: 1, value: '50'},
    {weight: 1, value: '70'},
    {weight: 1, value: '100'},
  ]);
</script>

<Card.Root>
  <Card.Content>
    <div class="flex items-center gap-4">
      <div class={cn('flex items-center justify-center')}>
        {#if completed}
          <CircleCheck class="size-8 text-emerald-500" />
        {:else}
          <Circle class="size-8" />
        {/if}
      </div>

      <div class="flex size-10 shrink-0 items-center justify-center rounded-lg bg-red-900">
        {#if icon}
          {@const Icon = icon.icon}
          <Icon class="size-5 text-white" />
        {/if}
      </div>

      <div class="flex-1">
        <h3 class={cn('font-bold', completed ? 'line-through text-muted-foreground' : '')}>{title}</h3>
        <div class="text-muted-foreground">
          <span>Respawns Mon, Wed, Fri</span>
        </div>
      </div>

      <div class="flex gap-4">
        <HabitDifficultyBadge value={difficulty} />
        <span class="text-green-500">+{xp} XP</span>
      </div>
    </div>
  </Card.Content>
</Card.Root>
