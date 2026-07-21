<script lang="ts" module>
</script>

<script lang="ts">
  import { SquarePen, Sword } from '@lucide/svelte';

  // Types
  import type { QuestAssessment } from './types';

  // Lib
  import * as Card from '$lib/components/ui/card';
  import { Badge } from '$lib/components/ui/badge';
  import { cn } from '$lib/utils';

  // Consts
  import { COLORS } from './consts';

  import QuestIconDialog from './icon.dialog.svelte';
  import QuestIcon from './icon.svelte';

  let assessment = $state<QuestAssessment>({
    icon: 'brush_cleaning',
    color: 'blue',
    difficulty: 'hard',
    difficultyReason: 'The task is due today and requires immediate, repetitive effort to clear the backlog.',
    questNames: {
      combat: 'Slay Ashen Wraith',
      trial: 'Endure Forsaken Abyss',
      discovery: 'Claim Eternal Relic'
    },
    topPick: 'combat'
  });
</script>

<div>
  <div class="grid grid-cols-2 gap-4">
    <Card.Root class="py-4">
      <Card.Header class="px-4">
        <Card.Description>Icon</Card.Description>
        <Card.Title class="flex text-md gap-2 justify-self-start items-center">
          <QuestIcon icon={assessment.icon} color={assessment.color} />
          <span class="capitalize">{assessment.icon.replace('_', ' ')}</span>
        </Card.Title>
        <Card.Action>
          <QuestIconDialog icon={assessment.icon} onchange={(i) => assessment.icon = i} />
        </Card.Action>
      </Card.Header>
    </Card.Root>

    <Card.Root class="py-4">
      <Card.Header class="px-4">
        <Card.Description>Color</Card.Description>
        <Card.Title class="flex text-md gap-2 justify-self-start items-center">
          {#each COLORS as color, index(index)}
            {#if color.name === assessment.color}
              <div class={cn('size-6 rounded-full border border-border', color.bg)}></div>
              <span class="capitalize">{assessment.color}</span>
            {/if}
          {/each}
        </Card.Title>
        <Card.Action>
          <Badge variant="outline">
            <SquarePen />
          </Badge>
        </Card.Action>
      </Card.Header>
    </Card.Root>

    <Card.Root class="py-4">
      <Card.Header class="px-4">
        <Card.Description>Difficulty</Card.Description>
        <Card.Title class="flex text-md gap-2 justify-self-start items-center">
          {#each COLORS as color, index(index)}
            {#if color.name === assessment.color}
              <Sword class={color.text} />
            {/if}
          {/each}
          <span class="capitalize">{assessment.difficulty}</span>
        </Card.Title>
        <Card.Action>
          <Badge variant="outline">
            <SquarePen />
          </Badge>
        </Card.Action>
      </Card.Header>
    </Card.Root>

    <Card.Root class="py-4">
      <Card.Header class="px-4">
        <Card.Description>XP Reward</Card.Description>
        <Card.Title class="text-lg">
          $1,250.00
        </Card.Title>
        <Card.Action>
          <Badge variant="outline">
            <SquarePen />
          </Badge>
        </Card.Action>
      </Card.Header>
    </Card.Root>
  </div>

  <blockquote class="mt-6 border-s-2 ps-6 italic">
    {assessment.difficultyReason}
  </blockquote>
</div>
