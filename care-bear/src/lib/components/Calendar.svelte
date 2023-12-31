<script>
	import { onMount } from 'svelte';
	import TaskAdder from './task/TaskAdder.svelte';

	export let tasks = [];

	let currentDate;
	let selectedDate;
	let daysInMonth = [];
	let blankDays = [];

	onMount(() => {
		currentDate = new Date();
		selectedDate = new Date();
		updateCalendar();
	});

	function changeMonth(monthChange) {
		selectedDate = new Date(selectedDate.getFullYear(), selectedDate.getMonth() + monthChange, 1);
		updateCalendar();
	}

	function updateCalendar() {
		const firstDayOfMonth = new Date(
			selectedDate.getFullYear(),
			selectedDate.getMonth(),
			1
		).getDay();
		const numDays = new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 0).getDate();

		blankDays = Array(firstDayOfMonth).fill(null);
		daysInMonth = Array.from({ length: numDays }, (_, i) => i + 1);
	}

	let events = {}; // Object to store events

	let showEventModal = false;
	let newEventDate,
		newEventName = '',
		newEventTime = '';

	function openEventModal(day) {
		showEventModal = true;
		newEventDate = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), day);
	}

	function saveEvent() {
		if (!newEventName || !newEventTime) {
			alert('Please enter both event name and time.');
			return;
		}
		const dateString = newEventDate.toISOString().split('T')[0];
		if (!events[dateString]) {
			events[dateString] = [];
		}
		events[dateString].push({ name: newEventName, time: newEventTime });

		// Use Svelte's update method here to ensure reactivity
		events = Object.assign({}, events);

		newEventName = '';
		newEventTime = '';
		showEventModal = false;
	}

	function displayEvents(dateString) {
		console.log('Displaying events for:', dateString);
		return events[dateString]?.map((event) => `${event.name} at ${event.time}`).join(', ') || '';
	}
</script>

<div class="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
	<div class="max-w-md w-full space-y-8 border border-gray-300 rounded-lg p-6">
		<div>
			<!-- Calendar Header -->
			<div class="flex justify-between items-center">
				<button
					class="bg-orange-200 hover:bg-orange-300 text-white font-bold py-2 px-4 rounded"
					on:click={() => changeMonth(-1)}
					aria-label="Previous Month"
				>
					&lt; Prev
				</button>
				<span
					class="text-xl font-bold text-orange-300"
					id="month-year"
					role="heading"
					aria-level="2"
					aria-live="assertive"
				>
					{selectedDate
						? `${selectedDate.toLocaleString('default', {
								month: 'long'
						  })} ${selectedDate.getFullYear()}`
						: 'Loading...'}
				</span>
				<button
					class="bg-orange-200 hover:bg-orange-300 text-white font-bold py-2 px-4 rounded"
					on:click={() => changeMonth(1)}
					aria-label="Next Month"
				>
					Next &gt;
				</button>
			</div>

			<!-- Weekdays -->
			<div class="grid grid-cols-7 gap-1 mt-4" role="row">
				<div class="text-center font-semibold text-gray-600" role="columnheader">Sun</div>
				<div class="text-center font-semibold text-gray-600" role="columnheader">Mon</div>
				<div class="text-center font-semibold text-gray-600" role="columnheader">Tue</div>
				<div class="text-center font-semibold text-gray-600" role="columnheader">Wed</div>
				<div class="text-center font-semibold text-gray-600" role="columnheader">Thu</div>
				<div class="text-center font-semibold text-gray-600" role="columnheader">Fri</div>
				<div class="text-center font-semibold text-gray-600" role="columnheader">Sat</div>
			</div>

			<!-- Days -->
			<div class="grid grid-cols-7 gap-1 mt-1" role="rowgroup">
				{#each blankDays as _, i}
					<div class="text-center text-gray-400" role="gridcell" aria-hidden="true" />
				{/each}
				{#each daysInMonth as day}
					<div
						class="text-center p-2 cursor-pointer hover:bg-orange-100 rounded-full border border-gray-300"
						on:click={() => openEventModal(day)}
						role="gridcell"
						aria-label={day}
					>
						{day}
						<div class="text-xs mt-1 text-gray-500">
							{displayEvents(
								new Date(selectedDate.getFullYear(), selectedDate.getMonth(), day)
									.toISOString()
									.split('T')[0]
							)}
						</div>
					</div>
				{/each}
			</div>

			<!-- Event Input -->
			{#if showEventModal}
				<div class="mt-4 p-4 border rounded bg-white shadow-md">
					<p class="text-lg font-semibold mb-2 text-black" role="heading" aria-level="2">
						Selected date: {newEventDate}
					</p>
					<TaskAdder calendarDate={newEventDate} />
				</div>
			{/if}
		</div>
	</div>
</div>

<!-- Task list
	  <div class="border-t pt-4">
		<h2 class="text-xl font-semibold text-black">Task List</h2>
		<div class="mt-4">
		  {#each tasks.slice().reverse() as task}
			<div class="border rounded p-3 mb-2 bg-white">
			  <p>{task.title}</p>
			</div>
		  {/each}
		</div>
	  </div> -->
