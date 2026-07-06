<script lang="ts">
  import type { PageData } from './$types';

  // Page
  import { HabitListPage } from '$package/habit';

  export let data: PageData;
</script>

<HabitListPage {data} />
