<script lang="ts">
  import type { PageData } from './$types';

  // Page
  import { HabitCreatePage } from '$package/habit';

  export let data: PageData;
</script>

<HabitCreatePage {data} />
