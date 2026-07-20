<script lang="ts" module>
  // Interface/Types
  import type { QuestType } from './types';

  interface Props {
    type: QuestType
    class?: string
  }
</script>

<script lang="ts">
  import { Ghost, Zap, MapPin } from '@lucide/svelte';

  // Lib
  import { cn } from '$lib/utils';

  let { type, class: className }: Props = $props();

  let icon = $derived.by(() => {
    switch (type) {
      case 'daily':
        return Ghost;

      case 'habit':
        return Zap;

      case 'todo':
        return MapPin;
    }
  });

  let label = $derived.by(() => {
    switch (type) {
      case 'daily':
        return 'Recurring foes';

      case 'habit':
        return 'Wielded powers';

      case 'todo':
        return 'One-time quests';
    }
  });
</script>

<p class={cn(className, 'flex gap-2')}>
  {#if icon}
    {@const Icon = icon}
    <Icon />
  {/if}
  <span>{label}</span>
</p>
