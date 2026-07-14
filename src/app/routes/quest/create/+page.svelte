<script lang="ts">
  import type { PageData } from './$types';

  // Page
  import { CreateQuestPage } from '$package/quest';

  export let data: PageData;
</script>

<CreateQuestPage {data} />
