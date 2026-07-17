<script lang="ts">
  import type { PageData } from './$types';

  // Page
  import { ListQuestPage } from '$package/quest';

  export let data: PageData;
</script>

<ListQuestPage {data} />
