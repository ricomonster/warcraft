<script lang="ts" module>
  // Interface/Types
  import type { PageData } from '$routes/quest/$types';

  const TOTAL = 10;

  interface Props {
    data: PageData
  }
</script>

<script lang="ts">
  import type { ListQuest } from './types';

  // Packages

  // Lib
  import * as Avatar from '$lib/components/ui/avatar';
  import * as Card from '$lib/components/ui/card';
  import { Badge } from '$lib/components/ui/badge';
  import { Progress } from '$lib/components/ui/progress';

  import QuestListCard from './list.card.svelte';
  import QuestTypeLabel from './type.label.svelte';

  let { data }: Props = $props();
  let { quests }: { quests: ListQuest[] } = data;

  let momentum = $state(6);
</script>

<section class="container mx-auto max-w-xl py-8">
  <Card.Root class="mb-4">
    <Card.Header class="flex items-center gap-4">
      <div>
        <Avatar.Root class="rounded-lg size-10">
          <Avatar.Image src="https://github.com/evilrabbit.png" alt="@evilrabbit" />
          <Avatar.Fallback>SS</Avatar.Fallback>
        </Avatar.Root>
      </div>
      <div class="flex-1">
        <Card.Title>Sir sir</Card.Title>
        <Card.Description>
          <span>Level 7</span> &bull; <span>Pulis Pangkalawakan</span>
        </Card.Description>
      </div>
      <div>
        <Badge variant="destructive">12-day war</Badge>
      </div>
    </Card.Header>
    <Card.Content>
      <div class="flex flex-col gap-2">
        <div class="flex">
          <p class="text-xs">
            <span>800</span>
            <span class="text-muted-foreground">/ 1200 XP</span>
          </p>

          <p class="text-xs ml-auto">
            <span class="text-muted-foreground">Lv 8 in</span>
            <span>360 XP</span>
          </p>
        </div>
        <Progress value={33} />
      </div>
      <div class="flex gap-2 items-center hidden">
        <p class="text-muted-foreground text-xs text-center">Momentum</p>
        <div
          class="flex gap-1 flex-1"
          role="meter"
          aria-label="Momentum"
          aria-valuenow={momentum}
          aria-valuemin={0}
          aria-valuemax={TOTAL}
        >
          {#each Array(TOTAL) as _, i (i)}
            <div class={[
              'flex-1 h-1 rounded-sm transition-colors duration-300',
              i < momentum
                ? 'bg-primary'
                : 'bg-white/10'
            ].join(' ')}></div>
          {/each}
        </div>
      </div>
    </Card.Content>
  </Card.Root>

  <div class="flex flex-col gap-4">
    {#if quests.length > 0}
      {#each quests as ql, index(index)}
        <div>
          <QuestTypeLabel
            class="text-muted-foreground text-sm font-bold py-2"
            type={ql.type} />

          <div class="flex flex-col gap-3">
            {#each ql.quests as quest, index(index) }
              <QuestListCard {quest} />
            {/each}
          </div>
        </div>
      {/each}
    {/if}
  </div>
</section>
