<script lang="ts" module>
  // Interface/Types
  import type { QuestType } from './types';

  interface Props {
    type: QuestType
  }
</script>

<script lang="ts">
  import { Ghost, Zap, MapPin } from '@lucide/svelte';

  let { type }: Props = $props();

  let icon = $state();
  let label = $state();

  switch (type) {
    case 'daily':
      icon = Ghost;
      label = 'Recurring foes';
      break;

    case 'habit':
      icon = Zap;
      label = 'Wielded powers';
      break;

    case 'todo':
      icon = MapPin;
      label = 'One-time quests';
      break;
  }
</script>
