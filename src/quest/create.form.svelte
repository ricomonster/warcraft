<script lang="ts" module>
  import type { SubmitFunction } from '@sveltejs/kit';
  import {
    type SuperValidated,
    type Infer,
    type FormPathLeaves,
    superForm,
  } from 'sveltekit-superforms';
  import type { z } from 'zod';

  // Schema
  import { createQuestFormSchema, type CreateQuestFormSchema } from './schema';

  type FormSchema = z.infer<typeof createQuestFormSchema>

  interface Props {
    form: SuperValidated<Infer<CreateQuestFormSchema>>
    step?: number;
    onchangestep?(step: number): void;
    onquest?(name: string): void;
  }

  const STEP_FIELDS: Record<number, FormPathLeaves<FormSchema>[]> = {
    1: ['name', 'color', 'icon'],
    2: ['type'],
    3: ['target', 'alignment', 'timeframe', 'dueDate'],
    4: ['difficulty', 'dailyReminder', 'remindTimeAt']
  };
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
  import { questify } from '$package/quest';

  // Lib
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
  import { cn } from '$lib/utils';

  // Utils
  import { formatDayLabel } from './util';

  import {
    COLORS,
    DAYS,
    ICONS,
    WEEKDAYS,
    TYPE_OPTIONS,
    ALIGNMENT_OPTIONS,
    TIMEFRAME_OPTIONS,
    DIFFICULTY_OPTIONS,
  } from './consts';

  let { form: initialForm, step = 1, onchangestep, onquest }: Props = $props();

  let todayDate = today(getLocalTimeZone());


  let duedate = $state<CalendarDate | undefined>(new CalendarDate(todayDate.year, todayDate.month, todayDate.day));

  const adjustTarget = (event: MouseEvent, delta: number): void => {
    event.preventDefault();
    if ($formData.type !== 'daily' && $formData.type !== 'habit') {
      return;
    }

    const current = $formData.target ?? 1;
    $formData.target = Math.max(1, Math.min(99, current + delta));
  };

  const switchStep = async (selected: number): Promise<void> => {
    let s = selected;

    // Validate current step
    if (selected > step) {
      if (step === 4 && $formData.type === 'daily') {
        if (!$formData.days || $formData.days.length === 0) {
          $errors.days = { _errors: ['Select at least one day'] };
          return;
        }
        $errors.days = undefined;
      }

      const fields = STEP_FIELDS[step] ?? [];
      for (const field of fields) {
        const errors = await form.validate(field, { update: true });
        if (errors) {
          return;
        }
      }
    }

    switch (s) {
      case 2: {
        // generate questified name
        if ($formData.quest === '') {
          $formData.quest = questify($formData.name);
          onquest?.($formData.quest);
        }
        break;
      }

      case 3:
      case 4:
        break;
    }

    if (selected < 1) {
      s = 1;
    } else if (selected > 4) {
      s = 4;
    }

    onchangestep?.(s);
  };

  const form = superForm(initialForm, {
    validators: zod4Client(createQuestFormSchema),
    dataType: 'json',
    onSubmit: ({ cancel }) => {
      if (step !== 4) {
        cancel();
        switchStep(Math.min(step + 1, 4));
        return false;
      }
    }
  });


  const { form: formData, enhance, allErrors, errors } = form;

  $effect(() => {
    if ($formData.dailyReminder && !$formData.remindTimeAt) {
      $formData.remindTimeAt = '09:00';
      $formData.remindDaysAt = WEEKDAYS;
    } else if (!$formData.dailyReminder && $formData.remindTimeAt) {
      $formData.remindTimeAt = '';
      $formData.remindDaysAt = [];
    }

    if ($formData.type === 'daily' && $formData.days.length < 1) {
      $formData.days = WEEKDAYS;
    }

    console.log($allErrors);
  });
</script>

<form method="POST" novalidate use:enhance>
  <Field.Group class={cn(step === 1 ? '' : 'hidden')}>
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

    <Form.Field {form} name="icon">
      <Form.Control>
        {#snippet children({ props })}
          <Form.Label for="icon">Icon</Form.Label>
          <ToggleGroup.Root {...props} type="single" class="flex flex-wrap gap-2" spacing={2} size="sm" variant="outline" bind:value={$formData.icon}>
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

  <Field.Group class={cn(step === 2 ? '' : 'hidden')}>
    <Form.Field {form} name="type">
      <Form.Control>
        {#snippet children({ props })}
          <Form.Label for="type">Choose your battle type</Form.Label>
          <Form.Description>This decides how the battle unfolds.</Form.Description>

          <ToggleGroup.Root {...props} type="single" bind:value={$formData.type} class="flex flex-col w-full gap-2" variant="outline" spacing={1}>
            {#each TYPE_OPTIONS as type, index (index)}
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

  <div class={cn(step === 3 ? '' : 'hidden')}>
    {#if $formData.type === 'daily'}
      <Field.Group>
        <Form.Field {form} name="days">
          <Form.Control>
            {#snippet children({ props })}
              <Form.Label for="days">Choose your battle days</Form.Label>
              <Form.Description>Taps to toggle day you'll face this quest.</Form.Description>

              <ToggleGroup.Root {...props} type="multiple" bind:value={$formData.days} class="flex flex-wrap gap-2" variant="outline" spacing={2}>
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

              <Form.FieldErrors />
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
              <Form.FieldErrors />
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
                <Select.Trigger {...props} class="w-full">
                  {ALIGNMENT_OPTIONS.find((d) => d.value === $formData.alignment)?.label ?? '-- Select --'}
                </Select.Trigger>
                <Select.Content>
                  <Select.Group>
                    <Select.Label>-- Select --</Select.Label>
                    {#each ALIGNMENT_OPTIONS as deadline, index (index)}
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
        <Form.Field {form} name="timeframe">
          <Form.Control>
            {#snippet children({ props })}
              <Form.Label for="duedate">Set a deadline for this quest?</Form.Label>
              <Form.Description>No rush. Leave it open if there's no expiry.</Form.Description>

              <ToggleGroup.Root type="single" bind:value={$formData.timeframe} class="grid grid-cols-5" variant="outline" spacing={2}>
                {#each TIMEFRAME_OPTIONS as ddo, index (index)}
                  <ToggleGroup.Item
                    value={ddo.value}
                    aria-label={`Toggle due date ${ddo.label}`}
                    class="col-span-1"
                  >
                    {ddo.label}
                  </ToggleGroup.Item>
                {/each}
              </ToggleGroup.Root>

              {#if $formData.timeframe === 'custom'}
                <Calendar
                  type="single"
                  bind:value={duedate}
                  class="bg-transparent p-0 [--cell-size:--spacing(9.5)] mx-auto"
                />
              {/if}
              <input type="hidden" bind:value={$formData.dueDate} {...props} />
            {/snippet}
          </Form.Control>
        </Form.Field>
      </Field.Group>
    {/if}

    <div class="flex justify-between items-center mt-6">
      <Button variant="secondary" onclick={(e) => {e.preventDefault(); switchStep(2);}}>Previous</Button>
      <Button onclick={(e) => {e.preventDefault(); switchStep(4);}}>Next</Button>
    </div>
  </div>

  <div class={cn(step === 4 ? '' : 'hidden')}>
    <Field.Group>
      <Form.Field {form} name="difficulty">
        <Form.Control>
          {#snippet children({ props })}
            <Form.Label for="difficulty">How tough is this foe?</Form.Label>
            <Form.Description>Tougher battles drop more XP when won.</Form.Description>

            <ToggleGroup.Root {...props} type="single" bind:value={$formData.difficulty} class="grid grid-cols-3 mx-auto" variant="outline" spacing={2}>
              {#each DIFFICULTY_OPTIONS as diff, index (index)}
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

      <Form.Field {form} name="dailyReminder">
        <Form.Control>
          {#snippet children({ props })}
            <Form.Label for="reminder">Sound the war horn?</Form.Label>
            <Form.Description>We'll send a battle alert at this time each day.</Form.Description>
            <input type="hidden" {...props} value={$formData.dailyReminder} />
          {/snippet}
        </Form.Control>
      </Form.Field>

      <Card.Root>
        <Card.Header>
          <div class="flex items-center gap-4">
            <Bell class="size-5 text-muted-foreground" />
            <div>
              <Card.Title>Daily reminder</Card.Title>
              <Card.Description>
                {#if $formData.dailyReminder}
                  <time>{$formData.remindTimeAt}</time> &bull;
                  <span>{formatDayLabel($formData.remindDaysAt ?? [])}</span>
                {:else}
                  <span>Off</span>
                {/if}
              </Card.Description>
            </div>
          </div>

          <Card.Action>
            <Switch bind:checked={$formData.dailyReminder} />
          </Card.Action>
        </Card.Header>

        {#if $formData.dailyReminder}
          <Card.Content class="flex flex-col gap-4">
            <Form.Field {form} name="remindTimeAt">
              <Form.Control>
                {#snippet children({ props })}
                  <Form.Label for="remindTimeAt">Sound the horn at</Form.Label>
                  <Input {...props} type="time" class="w-32" bind:value={$formData.remindTimeAt} />
                {/snippet}
              </Form.Control>
            </Form.Field>

            <Form.Field {form} name="remindDaysAt">
              <Form.Control>
                {#snippet children({ props })}
                  <Form.Label for="reminder">On these battle days</Form.Label>
                  <ToggleGroup.Root {...props} type="multiple" bind:value={$formData.remindDaysAt} class="grid grid-cols-7" variant="outline" spacing={2}>
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
          </Card.Content>
        {/if}
      </Card.Root>

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
  </div>
</form>
