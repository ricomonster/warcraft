<script lang="ts" module>
  // Interface/Types
  import type { PageData } from '$routes/quest/create/$types';

  interface Props {
    data: PageData
  }
</script>

<script lang="ts">
  import { CircleQuestionMark } from '@lucide/svelte';

  // Packages
  import { Skeleton } from '$lib/components/ui/skeleton';
  import * as Card from '$lib/components/ui/card';
  import * as Stepper from '$lib/components/ui/stepper';

  import QuestCreateForm from './create.form.svelte';

  import { ALL_ICONS, ICONS } from './consts';

  let { data }: Props = $props();

  let icon = $state(ICONS[0].name);
  let currentStep = $state(1);
  let quest = $state<string>();
  let loading = $state<boolean>(false);

  const handleChangeStep = (step: number): void => {
    currentStep = step;
  };
</script>

<Stepper.Root step={currentStep}>
  <section class="flex min-h-svh w-full justify-center p-6 md:p-10">
    <div class="w-full max-w-lg">
      <Card.Root>
        <Card.Header>
          <Stepper.Nav orientation="horizontal" class="justify-between mb-4">
            <Stepper.Item id="address">
              <Stepper.Trigger>
                <Stepper.Indicator>
                  1
                </Stepper.Indicator>
              </Stepper.Trigger>
              <Stepper.Separator />
            </Stepper.Item>
            <Stepper.Item>
              <Stepper.Trigger disabled={currentStep < 2}>
                <Stepper.Indicator>
                  2
                </Stepper.Indicator>
              </Stepper.Trigger>
              <Stepper.Separator />
            </Stepper.Item>
            <Stepper.Item>
              <Stepper.Trigger disabled={currentStep < 3}>
                <Stepper.Indicator>
                  3
                </Stepper.Indicator>
              </Stepper.Trigger>
              <Stepper.Separator />
            </Stepper.Item>
            <Stepper.Item>
              <Stepper.Trigger disabled={currentStep < 4}>
                <Stepper.Indicator>
                  4
                </Stepper.Indicator>
              </Stepper.Trigger>
            </Stepper.Item>
          </Stepper.Nav>

          <Card.Title class="flex gap-4 items-center">
            {#if loading}
              <div class="flex items-center space-x-4">
                <Skeleton class="size-12 rounded-full" />
                <div class="space-y-2">
                  <Skeleton class="h-4 w-[250px]" />
                  <Skeleton class="h-4 w-[200px]" />
                </div>
              </div>
            {:else}
              {#if quest}
                {#each ALL_ICONS as ic, index (index)}
                  {#if ic.name === icon}
                    {@const SelectedIcon = ic.icon}
                    <SelectedIcon />
                  {/if}
                {/each}

                <span class="text-xl">{quest}</span>
              {:else}
                <CircleQuestionMark class="text-slate-500" />
                <span class="text-lg text-muted-foreground">Your quest will appear here...</span>
              {/if}
            {/if}
          </Card.Title>
        </Card.Header>
        <Card.Content>
          <QuestCreateForm
            form={data.form}
            step={currentStep}
            onloading={(s) => loading = s}
            onchangestep={handleChangeStep} />
        </Card.Content>
      </Card.Root>
    </div>
  </section>
</Stepper.Root>
