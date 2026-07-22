<script lang="ts" module>
</script>

<script lang="ts">
  import { SquarePen, CircleCheck, Circle } from '@lucide/svelte';

  // Types
  import type { Difficulty, QuestAssessment } from './types';

  // Lib
  import * as Card from '$lib/components/ui/card';
  import * as Field from '$lib/components/ui/field';
  import * as ToggleGroup from '$lib/components/ui/toggle-group';
  import { Badge } from '$lib/components/ui/badge';
  import { cn } from '$lib/utils';

  // Consts
  import { COLORS, DIFFICULTY_OPTIONS, QUEST_STYLE_OPTIONS } from './consts';

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

  let questStyle = $state(assessment.topPick);
  let difficulty = $state(assessment.difficulty);

  const handleQuestNameSelect = (style: string): void => {
    console.log(style);
  };
</script>

<div class="flex flex-col gap-8">
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
  </div>

  <Field.Group>
    <Field.Field>
      <Field.Label for="difficulty">Difficulty</Field.Label>
      <ToggleGroup.Root
        value={difficulty}
        class="flex flex-row w-full gap-2"
        onValueChange={(v) => {
          if (v) {
            difficulty = v as Difficulty;
          }
        }}
        spacing={2}
        type="single"
        variant="outline"
      >
        {#each DIFFICULTY_OPTIONS as diff, index (index)}
          <ToggleGroup.Item
            value={diff.value}
            aria-label={`Toggle difficulty ${diff.label}`}
            class="flex-1 justify-center"
          >
            {diff.label}
          </ToggleGroup.Item>
        {/each}
      </ToggleGroup.Root>
    </Field.Field>
  </Field.Group>

  <blockquote class="border-s-2 ps-6 italic">
    {assessment.difficultyReason}
  </blockquote>

  <Field.Group>
    <Field.Field>
      <Field.Label for="difficulty">Choose your quest name</Field.Label>
      <ToggleGroup.Root
        class="flex flex-col w-full gap-2"
        onValueChange={handleQuestNameSelect}
        spacing={2}
        type="single"
        bind:value={questStyle}
        variant="outline"
      >
        {#each QUEST_STYLE_OPTIONS as style, index(index)}
          {@const StyleIcon = style.icon}
          <ToggleGroup.Item
            value={style.value}
            aria-label="Toggle quest style {style.value}"
            class="flex items-center gap-5 p-3 h-auto justify-start text-left w-full"
          >
            <StyleIcon class="size-6" />
            <div>
              <h4 class="font-bold">{assessment.questNames[style.value]}</h4>
              <p class="text-muted-foreground text-xs">
                <span>Combat style</span>
                {#if assessment.topPick === style.value}
                  &bull; <span>Recommended</span>
                {/if}
              </p>
            </div>

            {#if questStyle === style.value}
              <CircleCheck class="size-6 text-emerald-500 ml-auto" />
            {:else}
              <Circle class="size-6 ml-auto" />
            {/if}
          </ToggleGroup.Item>
        {/each}
      </ToggleGroup.Root>
    </Field.Field>
  </Field.Group>
</div>
