<script lang="ts" module>
</script>

<script lang="ts">
  import { SquarePen } from '@lucide/svelte';

  // Lib
  import * as Card from '$lib/components/ui/card';
  import { Badge } from '$lib/components/ui/badge';
</script>

<div class="grid grid-cols-2 gap-4">
  <Card.Root class="py-4">
    <Card.Header class="px-4">
      <Card.Description>Icon</Card.Description>
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

  <Card.Root class="py-4">
    <Card.Header class="px-4">
      <Card.Description>Color</Card.Description>
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

  <Card.Root class="py-4">
    <Card.Header class="px-4">
      <Card.Description>Difficulty</Card.Description>
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
