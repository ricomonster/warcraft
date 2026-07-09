<script lang="ts" module>
  import {
    type SuperValidated,
    type Infer,
    superForm,
  } from 'sveltekit-superforms';

  // Schema
  import type { CreateHabitFormSchema } from './schema';

  interface Props {
    form: SuperValidated<Infer<CreateHabitFormSchema>>
    step?: number;
    onchangestep?(step: number): void;
  }
</script>

<script lang="ts">
  import {
    Plus,
    Minus,
    Bell,
  } from '@lucide/svelte';
  import { CalendarDate, getLocalTimeZone, today } from '@internationalized/date';
  import { zod4Client } from 'sveltekit-superforms/adapters';

  // Packages
  import Calendar from '$lib/components/ui/calendar/calendar.svelte';
  import { Button } from '$lib/components/ui/button';
  import { Input } from '$lib/components/ui/input';
  import { Switch } from '$lib/components/ui/switch';
  import { Textarea } from '$lib/components/ui/textarea';
  import * as Card from '$lib/components/ui/card';
  import * as Field from '$lib/components/ui/field';
  import * as Form from '$lib/components/ui/form';
  import * as Select from '$lib/components/ui/select';
  import * as ToggleGroup from '$lib/components/ui/toggle-group';

  // Schema
  import { createHabitFormSchema } from './schema';

  import {
    COLORS,
    DAYS,
    DEADLINE_OPTIONS,
    DIFFICULTY,
    DUEDATE_OPTIONS,
    ICONS,
    TYPES,
  } from './consts';

  let { form: initialForm, step = 1, onchangestep }: Props = $props();

  let todayDate = today(getLocalTimeZone());


  let duedateValue = $state(DUEDATE_OPTIONS[0].value);
  let duedate = $state<CalendarDate | undefined>(new CalendarDate(todayDate.year, todayDate.month, todayDate.day));

  const adjustTarget = (event: MouseEvent, delta: number): void => {
    event.preventDefault();
    if ($formData.type !== 'daily' && $formData.type !== 'habit') {
      return;
    }

    const current = $formData.target ?? 1;
    $formData.target = Math.max(1, Math.min(99, current + delta));
  };

  const switchStep = (selected: number): void => {
    let s = selected;
    if (selected < 1) {
      s = 1;
    } else if (selected > 4) {
      s = 4;
    }

    onchangestep?.(s);
  };

  const form = superForm(initialForm, {
    validators: zod4Client(createHabitFormSchema),
  });

  const { form: formData, enhance } = form;
</script>

<form method="POST" use:enhance>
  {#if step === 1}
    <Field.Group>
      <Form.Field {form} name="name">
        <Form.Control>
          {#snippet children({ props })}
            <Form.Label for="name">Name your quest</Form.Label>
            <Form.Description>
              What challenge are you taking on?
            </Form.Description>
            <Input {...props} type="input" placeholder="Do laundry, read a book" required bind:value={$formData.name} />
            <Form.FieldErrors />
          {/snippet}
        </Form.Control>
      </Form.Field>

      <Form.Field {form} name="color">
        <Form.Control>
          {#snippet children({ props })}
            <Form.Label for="color">Color</Form.Label>
            <ToggleGroup.Root {...props} type="single" class="flex gap-2" spacing={2} size="sm" bind:value={$formData.color}>
              {#each COLORS as color, index (index)}
                <ToggleGroup.Item
                  value={color}
                  aria-label="Toggle star"
                  class="w-8 h-8 rounded-full border-3 border-transparent data-[state=on]:border-foreground"
                  style="background:{color}"
                />
              {/each}
            </ToggleGroup.Root>
          {/snippet}
        </Form.Control>
      </Form.Field>

      <Form.Field {form} name="color">
        <Form.Control>
          {#snippet children({ props })}
            <Form.Label for="icon">Icon</Form.Label>
            <ToggleGroup.Root {...props} type="single" class="grid grid-cols-7 gap-2" spacing={2} size="sm" variant="outline" bind:value={$formData.icon}>
              {#each ICONS as icon, index (index)}
                {@const Icon = icon.icon}
                <ToggleGroup.Item value={icon.name}>
                  <Icon />
                </ToggleGroup.Item>
              {/each}
            </ToggleGroup.Root>
          {/snippet}
        </Form.Control>
      </Form.Field>

      <div class="ml-auto">
        <Button onclick={(e) => {e.preventDefault(); switchStep(2);}}>Next</Button>
      </div>
    </Field.Group>
  {/if}

  {#if step === 2}
    <Field.Group>
      <Form.Field {form} name="type">
        <Form.Control>
          {#snippet children({ props })}
            <Form.Label for="type">Choose your battle type</Form.Label>
            <Form.Description>This decides how the battle unfolds.</Form.Description>

            <ToggleGroup.Root {...props} type="single" bind:value={$formData.type} class="flex flex-col w-full gap-2" variant="outline" spacing={1}>
              {#each TYPES as type, index (index)}
                {@const Icon = type.icon}
                <ToggleGroup.Item
                  value={type.value}
                  aria-label="Toggle type"
                  class="flex items-start gap-3 p-3 h-auto justify-start text-left w-full"
                >
                  <div class="w-8 h-8 rounded-md flex items-center justify-center {type.bg}">
                    <Icon />
                  </div>
                  <div>
                    <p class="text-sm font-medium data-[state=on]:text-primary">{type.label}</p>
                    <p class="text-xs text-muted-foreground mt-0.5">{type.desc}</p>
                  </div>
                </ToggleGroup.Item>
              {/each}
            </ToggleGroup.Root>
          {/snippet}
        </Form.Control>
      </Form.Field>

      <div class="flex justify-between items-center">
        <Button variant="secondary" onclick={(e) => {e.preventDefault(); switchStep(1);}}>Previous</Button>
        <Button onclick={(e) => {e.preventDefault(); switchStep(3);}}>Next</Button>
      </div>
    </Field.Group>
  {/if}

  {#if step === 3}
    {#if $formData.type === 'daily'}
      <Field.Group>
        <Form.Field {form} name="days">
          <Form.Control>
            {#snippet children({ props })}
              <Form.Label for="days">Choose your battle days</Form.Label>
              <Form.Description>Taps to toggle day you'll face this quest.</Form.Description>

              <ToggleGroup.Root {...props} type="multiple" bind:value={$formData.days} class="grid grid-cols-7" variant="outline" spacing={2}>
                {#each DAYS as day, index (index)}
                  <ToggleGroup.Item
                    value={day.value}
                    aria-label="Toggle type"
                    class="col-span-1"
                  >
                    {day.name}
                  </ToggleGroup.Item>
                {/each}
              </ToggleGroup.Root>
            {/snippet}
          </Form.Control>
        </Form.Field>

        <Form.Field {form} name="target">
          <Form.Control>
            {#snippet children({ props })}
              <Form.Label for="target">How many strikes to slay it?</Form.Label>
              <Form.Description>eg. 8 hits for "drink water", 3 for "stretch breaks"</Form.Description>

              <div class="flex items-center gap-4">
                <Button size="sm" variant="outline" disabled={$formData.target <= 1} onclick={(e) => adjustTarget(e, -1)}><Minus /></Button>
                <span class="font-bold">{$formData.target}</span>
                <Button size="sm" variant="outline" onclick={(e) => adjustTarget(e, 1)}><Plus /></Button>
              </div>

              <input type="hidden" bind:value={$formData.target} {...props} />
            {/snippet}
          </Form.Control>
        </Form.Field>
      </Field.Group>
    {/if}

    {#if $formData.type === 'habit'}
      <Field.Group>
        <Form.Field {form} name="alignment">
          <Form.Control>
            {#snippet children({ props })}
              <Form.Label for="alignment">Choose this power's alignment</Form.Label>
              <Form.Description>Does it strengthen you, weaken, or both?</Form.Description>

              <Select.Root type="single" name="alignment" bind:value={$formData.alignment}>
                <Select.Trigger {...props} class="w-45">
                  {DEADLINE_OPTIONS.find((d) => d.value === $formData.alignment)?.label ?? '-- Select --'}
                </Select.Trigger>
                <Select.Content>
                  <Select.Group>
                    <Select.Label>-- Select --</Select.Label>
                    {#each DEADLINE_OPTIONS as deadline, index (index)}
                      <Select.Item
                        value={deadline.value}
                        label={deadline.label}
                      >
                        {deadline.label}
                      </Select.Item>
                    {/each}
                  </Select.Group>
                </Select.Content>
              </Select.Root>
            {/snippet}
          </Form.Control>
        </Form.Field>

        <Form.Field {form} name="target">
          <Form.Control>
            {#snippet children({ props })}
              <Form.Label for="target">How many strikes to slay it?</Form.Label>
              <Form.Description>eg. 8 hits for "drink water", 3 for "stretch breaks"</Form.Description>

              <div class="flex items-center gap-4">
                <Button size="sm" variant="outline" disabled={$formData.target <= 1} onclick={(e) => adjustTarget(e, -1)}><Minus /></Button>
                <span class="font-bold">{$formData.target}</span>
                <Button size="sm" variant="outline" onclick={(e) => adjustTarget(e, 1)}><Plus /></Button>
              </div>

              <input type="hidden" bind:value={$formData.target} {...props} />
            {/snippet}
          </Form.Control>
        </Form.Field>
      </Field.Group>
    {/if}

    {#if $formData.type === 'todo'}
      <Field.Group>
        <Form.Field {form} name="duedate">
          <Form.Control>
            {#snippet children({ props })}
              <Form.Label for="duedate">Set a deadline for this quest?</Form.Label>
              <Form.Description>No rush. Leave it open if there's no expiry.</Form.Description>

              <ToggleGroup.Root type="single" bind:value={$formData.duedate} class="grid grid-cols-5" variant="outline" spacing={2}>
                {#each DUEDATE_OPTIONS as ddo, index (index)}
                  <ToggleGroup.Item
                    value={ddo.value}
                    aria-label={`Toggle due date ${ddo.label}`}
                    class="col-span-1"
                  >
                    {ddo.label}
                  </ToggleGroup.Item>
                {/each}
              </ToggleGroup.Root>

              {#if duedateValue === 'custom'}
                <Calendar
                  type="single"
                  bind:value={duedate}
                  class="bg-transparent p-0 [--cell-size:--spacing(9.5)] mx-auto"
                />
              {/if}
              <input type="hidden" bind:value={$formData.duedate} {...props} />
            {/snippet}
          </Form.Control>
        </Form.Field>
      </Field.Group>
    {/if}

    <div class="flex justify-between items-center mt-6">
      <Button variant="secondary" onclick={(e) => {e.preventDefault(); switchStep(2);}}>Previous</Button>
      <Button onclick={(e) => {e.preventDefault(); switchStep(4);}}>Next</Button>
    </div>
  {/if}

  {#if step === 4}
    <Field.Group>
      <Form.Field {form} name="difficulty">
        <Form.Control>
          {#snippet children({ props })}
            <Form.Label for="difficulty">How tough is this foe?</Form.Label>
            <Form.Description>Tougher battles drop more XP when won.</Form.Description>

            <ToggleGroup.Root {...props} type="single" bind:value={$formData.difficulty} class="grid grid-cols-3" variant="outline" spacing={2}>
              {#each DIFFICULTY as diff, index (index)}
                <ToggleGroup.Item
                  value={diff.value}
                  aria-label={`Toggle difficulty ${diff.label}`}
                  class="col-span-1"
                >
                  {diff.label}
                </ToggleGroup.Item>
              {/each}
            </ToggleGroup.Root>
          {/snippet}
        </Form.Control>
      </Form.Field>

      <Form.Field {form} name="reminder">
        <Form.Control>
          {#snippet children({ props })}
            <Form.Label for="reminder">Sound the war horn?</Form.Label>
            <Form.Description>We'll send a battle alert at this time each day.</Form.Description>

            <Card.Root>
              <Card.Header>
                <div class="flex items-center gap-4">
                  <Bell class="size-5 text-muted-foreground" />
                  <div>
                    <Card.Title>Daily reminder</Card.Title>
                    <Card.Description>
                      8:00AM - Mon-Fri
                    </Card.Description>
                  </div>
                </div>

                <Card.Action>
                  <Switch />
                </Card.Action>
              </Card.Header>

              <Card.Content>
                <Field.Field orientation="horizontal">
                  <Form.Label for="reminder">Sound the horn at</Form.Label>
                  <Input type="time" class="w-32" />
                </Field.Field>

                <Form.Field {form} name="reminder">
                  <Form.Label for="reminder">On these battle days</Form.Label>
                  <ToggleGroup.Root {...props} type="multiple" bind:value={$formData.reminderDays} class="grid grid-cols-7" variant="outline" spacing={2}>
                    {#each DAYS as day, index (index)}
                      <ToggleGroup.Item
                        value={day.value}
                        aria-label="Toggle type"
                        class="col-span-1"
                      >
                        {day.name}
                      </ToggleGroup.Item>
                    {/each}
                  </ToggleGroup.Root>
                </Form.Field>
              </Card.Content>
            </Card.Root>
          {/snippet}
        </Form.Control>
      </Form.Field>

      <Form.Field {form} name="notes">
        <Form.Control>
          {#snippet children({ props })}
            <Form.Label for="notes">Battle notes</Form.Label>
            <Form.Description>Optional. Jot down your strategy.</Form.Description>

            <Textarea {...props} placeholder="Notes (optional)..." class="min-h-32" bind:value={$formData.notes} />
          {/snippet}
        </Form.Control>
      </Form.Field>
    </Field.Group>

    <div class="flex justify-between items-center mt-6">
      <Button variant="secondary" onclick={(e) => {e.preventDefault(); switchStep(3);}}>Previous</Button>
      <Form.Button>Create</Form.Button>
    </div>
  {/if}
</form>
