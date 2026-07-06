<script lang="ts" module>
</script>

<script lang="ts">
  // Packages
  import * as Card from '$lib/components/ui/card';

  import HabitListCard from './list.card.svelte';
</script>

<section class="container mx-auto max-w-xl">
  <Card.Root class="mb-4">
    <Card.Header></Card.Header>
    <Card.Content></Card.Content>
  </Card.Root>

  <div class="flex flex-col gap-3">
    {#each { length: 3 }}
      <HabitListCard />
    {/each}
  </div>
</section>
