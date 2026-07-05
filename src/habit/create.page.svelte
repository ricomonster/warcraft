<script lang="ts" module>
  // Interface/Types
  import type { PageData } from '$routes/habit/create/$types';

  interface Props {
    data: PageData
  }
</script>

<script lang="ts">
  // Packages
  import * as Card from '$lib/components/ui/card';
  import * as Stepper from '$lib/components/ui/stepper';

  import HabitCreateForm from './create.form.svelte';

  import { ALL_ICONS, ICONS } from './consts';

  let icon = $state(ICONS[0].name);
  let currentStep = $state(1);

  const handleChangeStep = (step: number): void => {
    currentStep = step;
    console.log(currentStep);
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

          <Card.Title class="flex gap-2 items-center">
            {#each ALL_ICONS as ic, index (index)}
              {#if ic.name === icon}
                {@const SelectedIcon = ic.icon}
                <SelectedIcon />
              {/if}
            {/each}

            <span class="text-xl">Quest name</span>
          </Card.Title>
        </Card.Header>
        <Card.Content>
          <HabitCreateForm step={currentStep} onchangestep={handleChangeStep} />
        </Card.Content>
      </Card.Root>
    </div>
  </section>
</Stepper.Root>
