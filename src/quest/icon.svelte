<script lang="ts" module>
  // Types
  import type { Icon } from './types';

  interface Props {
    icon: Icon
    color?: string
    class?: string
  }
</script>

<script lang="ts">
  // Lib
  import { cn } from '$lib/utils';

  // Consts
  import { ALL_ICONS, COLORS } from './consts';

  let { icon, color, class: className }: Props = $props();

  let ic = $derived.by(() => {
    return ALL_ICONS.find((i) => i.name === icon);
  });

  let co = $derived.by(() => {
    return COLORS.find((c) => c.name === color);
  });
</script>

{#if ic}
  {@const Icon = ic.icon}
  <Icon class={cn(className, co ? co.text : COLORS[0].text)} />
{/if}
