<script lang="ts" module>
  // Types
  import type { Icon } from './types';

  interface Props {
    icon: Icon
    onchange?(icon: Icon): void
  }
</script>

<script lang="ts">
  import { SquarePen } from '@lucide/svelte';

  // Lib
  import * as Dialog from '$lib/components/ui/dialog';
  import * as ToggleGroup from '$lib/components/ui/toggle-group';
  import { Button, buttonVariants } from '$lib/components/ui/button';

  import QuestIcon from './icon.svelte';

  // Consts
  import { ALL_ICONS } from './consts';

  let { icon, onchange }: Props = $props();

  let open = $state(false);
</script>

<Dialog.Root bind:open>
  <Dialog.Trigger type="button" class={buttonVariants({ variant: 'ghost', size: 'icon-xs' })}
  ><SquarePen class="size-3" /></Dialog.Trigger>
  <Dialog.Content>
    <Dialog.Header>
      <Dialog.Title>Icon</Dialog.Title>
    </Dialog.Header>

    <div class="flex justify-center">
      <QuestIcon class="size-20" {icon} />
    </div>

    <ToggleGroup.Root
      class="flex flex-row flex-wrap mx-auto justify-center"
      onValueChange={(v) => {
        if (v) {
          icon = v as Icon;
        }
      }}
      spacing={2}
      type="single"
      value={icon}
      variant="outline"
    >
      {#each ALL_ICONS as icon, index (index)}
        <ToggleGroup.Item
          value={icon.name}
          aria-label={`Toggle icon ${icon.name}`}
          class="col-span-1"
        >
          {@const Icon = icon.icon}
          <Icon />
        </ToggleGroup.Item>
      {/each}
    </ToggleGroup.Root>

    <Dialog.Footer>
      <Dialog.Close
        type="button"
        class={buttonVariants({ variant: 'outline' })}
      >
        Cancel
      </Dialog.Close>
      <Button type="submit" onclick={() => {
        onchange?.(icon);
        open = false;
      }}>Update</Button>
    </Dialog.Footer>
  </Dialog.Content>
</Dialog.Root>
