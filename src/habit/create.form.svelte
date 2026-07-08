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

  let color = $state(COLORS[0]);
  let icon = $state(ICONS[0].name);
  let type = $state(TYPES[0].value);
  let days = $state([DAYS[0].value]);
  let target = $state(1);
  let alignment = $state('');

  let duedateValue = $state(DUEDATE_OPTIONS[0].value);
  let duedate = $state<CalendarDate | undefined>(new CalendarDate(todayDate.year, todayDate.month, todayDate.day));

  let difficulty = $state(DIFFICULTY[1].value);

  const decreaseTarget = (event: MouseEvent): void => {
    event.preventDefault();
    target -= 1;
  };

  const increaseTarget = (event: MouseEvent): void => {
    event.preventDefault();
    target += 1;
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
      <Field.Field>
        <Field.Label for="quest">Name your quest</Field.Label>
        <Field.Description>
          What challenge are you taking on?
        </Field.Description>
        <Input id="quest" type="input" placeholder="Do laundry, read a book" required />
      </Field.Field>

      <Field.Field>
        <Field.Label for="color">Color</Field.Label>
        <ToggleGroup.Root type="single" class="flex gap-2" spacing={2} size="sm" bind:value={color}>
          {#each COLORS as color, index (index)}
            <ToggleGroup.Item
              value={color}
              aria-label="Toggle star"
              class="w-8 h-8 rounded-full border-3 border-transparent data-[state=on]:border-foreground"
              style="background:{color}"
            />
          {/each}
        </ToggleGroup.Root>
      </Field.Field>

      <Field.Field>
        <Field.Label for="icon">Icon</Field.Label>
        <ToggleGroup.Root type="single" class="grid grid-cols-7 gap-2" spacing={2} size="sm" variant="outline" bind:value={icon}>
          {#each ICONS as icon, index (index)}
            {@const Icon = icon.icon}
            <ToggleGroup.Item value={icon.name}>
              <Icon />
            </ToggleGroup.Item>
          {/each}
        </ToggleGroup.Root>
      </Field.Field>

      <div class="ml-auto">
        <Button onclick={(e) => {e.preventDefault(); switchStep(2);}}>Next</Button>
      </div>
    </Field.Group>
  {/if}

  {#if step === 2}
    <Field.Group>
      <Field.Field>
        <Field.Label for="type">Choose your battle type</Field.Label>
        <Field.Description>This decides how the battle unfolds.</Field.Description>

        <ToggleGroup.Root type="single" bind:value={type} class="flex flex-col w-full gap-2" variant="outline" spacing={1}>
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
      </Field.Field>

      <div class="flex justify-between items-center">
        <Button variant="secondary" onclick={(e) => {e.preventDefault(); switchStep(1);}}>Previous</Button>
        <Button onclick={(e) => {e.preventDefault(); switchStep(3);}}>Next</Button>
      </div>
    </Field.Group>
  {/if}

  {#if step === 3}
    {#if type === 'daily'}
      <Field.Group>
        <Field.Field>
          <Field.Label for="days">Choose your battle days</Field.Label>
          <Field.Description>Taps to toggle day you'll face this quest.</Field.Description>

          <ToggleGroup.Root type="multiple" bind:value={days} class="grid grid-cols-7" variant="outline" spacing={2}>
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
        </Field.Field>

        <Field.Field>
          <Field.Label for="target">How many strikes to slay it?</Field.Label>
          <Field.Description>eg. 8 hits for "drink water", 3 for "stretch breaks"</Field.Description>

          <div class="flex items-center gap-4">
            <Button size="sm" variant="outline" disabled={target <= 1} onclick={decreaseTarget}><Minus /></Button>
            <span class="font-bold">{target}</span>
            <Button size="sm" variant="outline" onclick={increaseTarget}><Plus /></Button>
          </div>
        </Field.Field>
      </Field.Group>
    {/if}

    {#if type === 'habit'}
      <Field.Group>
        <Field.Field>
          <Field.Label for="type">Choose this power's alignment</Field.Label>
          <Field.Description>Does it strengthen you, weaken, or both?</Field.Description>

          <Select.Root type="single" name="deadline" bind:value={alignment}>
            <Select.Trigger class="w-[180px]">
              {DEADLINE_OPTIONS.find((d) => d.value === alignment)?.label ?? '-- Select --'}
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
        </Field.Field>

        <Field.Field>
          <Field.Label for="target">How many strikes fuel this power?</Field.Label>
          <Field.Description>Land this many hits per day to keep it charged.</Field.Description>

          <div class="flex items-center gap-4">
            <Button size="sm" variant="outline" disabled={target <= 1} onclick={decreaseTarget}><Minus /></Button>
            <span class="font-bold">{target}</span>
            <Button size="sm" variant="outline" onclick={increaseTarget}><Plus /></Button>
          </div>
        </Field.Field>
      </Field.Group>
    {/if}

    {#if type === 'todo'}
      <Field.Group>
        <Field.Field>
          <Field.Label for="due_date">Set a deadline for this quest?</Field.Label>
          <Field.Description>No rush. Leave it open if there's no expiry.</Field.Description>
        </Field.Field>

        <ToggleGroup.Root type="single" bind:value={duedateValue} class="grid grid-cols-5" variant="outline" spacing={2}>
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
      </Field.Group>
    {/if}

    <div class="flex justify-between items-center mt-6">
      <Button variant="secondary" onclick={(e) => {e.preventDefault(); switchStep(2);}}>Previous</Button>
      <Button onclick={(e) => {e.preventDefault(); switchStep(4);}}>Next</Button>
    </div>
  {/if}

  {#if step === 4}
    <Field.Group>
      <Field.Field>
        <Field.Label for="difficulty">How tough is this foe?</Field.Label>
        <Field.Description>Tougher battles drop more XP when won.</Field.Description>

        <ToggleGroup.Root type="single" bind:value={difficulty} class="grid grid-cols-3" variant="outline" spacing={2}>
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
      </Field.Field>

      <Field.Field>
        <Field.Label for="reminder">Sound the war horn?</Field.Label>
        <Field.Description>We'll send a battle alert at this time each day.</Field.Description>

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
              <Field.Label for="reminder">Sound the horn at</Field.Label>
              <Input type="time" class="w-32" />
            </Field.Field>

            <Field.Field>
              <Field.Label for="reminder">On these battle days</Field.Label>
              <ToggleGroup.Root type="multiple" bind:value={days} class="grid grid-cols-7" variant="outline" spacing={2}>
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
            </Field.Field>
          </Card.Content>
        </Card.Root>
      </Field.Field>

      <Field.Field>
        <Field.Label for="notes">Battle notes</Field.Label>
        <Field.Description>Optional. Jot down your strategy.</Field.Description>

        <Textarea placeholder="Notes (optional)..." class="min-h-32" />
      </Field.Field>
    </Field.Group>

    <div class="flex justify-between items-center mt-6">
      <Button variant="secondary" onclick={(e) => {e.preventDefault(); switchStep(3);}}>Previous</Button>
      <Form.Button>Create</Form.Button>
    </div>
  {/if}
</form>
