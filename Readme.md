Student Productivity Dashboard

Objective: Build a functional React application that allows students to manage tasks, track study activities, save notes and monitor productivity.

1. Task Management

Create a form for adding new tasks.

Each task must have a title, description and priority.

Display all tasks in a list.

Allow users to edit tasks.

Allow users to delete tasks.

Allow users to mark tasks as completed.

2. Task Filtering

Create three filter buttons:

All Tasks

Completed Tasks

Pending Tasks

Add a search input that allows users to search for tasks by title.

3. Dashboard Statistics

Display:

Total number of tasks.

Number of completed tasks.

Number of pending tasks.

Percentage of completed tasks.

4. Study Tracker

Allow users to start a study session.

Create a timer that counts the study duration.

Allow users to stop the timer.

Display the total study time.

5. Notes Section

Allow users to write study notes.

Display saved notes.

Allow users to delete notes.

6. Theme Management

Add a light/dark mode toggle.

The selected theme should apply across the application.

Save the selected theme so it remains after refreshing the browser.

7. Data Persistence

Save tasks and notes in localStorage.

Retrieve saved information when the application loads.

Refreshing the browser must not erase the saved data.

PART C — Mandatory React Hooks

Your application must demonstrate the following:

useState — Manage application state.

useEffect — Handle localStorage synchronisation and the study timer.

useId — Connect form labels to their corresponding inputs.

useRef — Automatically focus the task input.

useMemo — Calculate filtered tasks and dashboard statistics.

useCallback — Optimise callbacks passed to memoized child components.

useContext — Manage the global theme.

Custom Hook — Create a reusable useLocalStorage hook.

Bonus: Use useReducer to manage task actions such as adding, updating, completing and deleting tasks.

PART D — Rules

Do not put the entire application inside one component.

Use reusable components.

Use proper React props.

Use meaningful variable and function names.

Do not manipulate the DOM directly when React state can handle the operation.

Do not use static values for the dashboard statistics.

Your application must work on mobile and desktop screens.

Do not copy another student's implementation.