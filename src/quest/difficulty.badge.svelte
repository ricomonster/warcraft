<script lang="ts" module>
  import type { BadgeVariant } from '$lib/components/ui/badge';

  export type Difficulty = 'easy' | 'medium' | 'hard'

  interface Props {
    value: Difficulty
    class?: string
  }
</script>

<script lang="ts">
  // Packages
  import { Badge } from '$lib/components/ui/badge';

  // Lib
  import { cn } from '$lib/utils';

  let { value, class: className }: Props = $props();

  let variant = $derived.by<BadgeVariant>(() => {
    switch (value) {
      case 'easy':
        return 'default';
      case 'medium':
        return 'outline';
      case 'hard':
        return 'destructive';
    }
  });

  let color = $derived.by<string>(() => {
    switch (value) {
      case 'easy':
        return 'bg-green-600 text-white';
      case 'medium':
        return 'bg-violet-600 text-white';
      case 'hard':
        return '';
    }
  });
</script>

<Badge class={cn(className, color, 'capitalize')} {variant}>{value}</Badge>
