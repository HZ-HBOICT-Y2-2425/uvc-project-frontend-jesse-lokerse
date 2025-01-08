<script>
  import { onMount } from "svelte";
  import { page } from "$app/stores";
  import "../../../app.css";
  import { goto } from "$app/navigation";

  const goalID = $page.params.personalGoalID;

  let CurentUserId = 1;
  let Goals;
  let UserGoals;
  let Users;
  let PersonalGoals = [];
  let updatedOmschrijving = "";
  let updatedGoal = 0;

  onMount(async () => {
    try {
      Goals = await fetchData("goals");
      Users = await fetchData("users");
      UserGoals = await fetchData("userGoals");
      PersonalGoals = await fetchData("personalGoals");

      // Initialize values for the specific goal
      const goal = PersonalGoals.find((pg) => pg.id === goalID);
      if (goal) {
        updatedOmschrijving = goal.omschrijving;
        updatedGoal = goal.goal;
      }

      console.log({ Goals, Users, UserGoals });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  });

  async function fetchData(db) {
    try {
      const response = await fetch("http://localhost:3011/" + db);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      let data = await response.json();
      console.log(data);
      return data;
    } catch (error) {
      console.error("Fetch error:", error);
      throw error;
    }
  }

  async function saveChanges() {
    try {
      // Ensure the updated fields are valid
      if (!updatedOmschrijving || updatedGoal === undefined) {
        alert("Please fill in all required fields.");
        return;
      }

      // Prepare the data to be sent
      const updatedData = {
        omschrijving: updatedOmschrijving,
        type: "goalType", // Replace with the actual type or fetch it dynamically
        goal: updatedGoal,
        userId: CurentUserId,
        claimed: false, // Or the appropriate boolean value
      };

      // Send the PUT request
      const response = await fetch(
        `http://localhost:3011/personalGoals/${goalID}`,
        {
          method: "PUT", // Matches the method in your backend
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedData), // Convert data to JSON
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      console.log("Saved successfully:", result);
      alert("Changes saved successfully!");
    } catch (error) {
      console.error("Error saving changes:", error);
      alert("Failed to save changes!");
    }
  }

  async function deleteGoal() {
    try {
      const response = await fetch(
        `http://localhost:3011/personalGoals/${goalID}`,
        { method: "DELETE" }
      );
      if (!response.ok) throw new Error("Error deleting goal");
      alert("Goal deleted successfully.");
      goto("/");
    } catch (error) {
      alert("Failed to delete goal.");
    }
  }
</script>

<div class="header rounded-b-3xl bg-blue-600 text-center pb-5">
  <h1 class="text-7xl text-white whitespace-nowrap">
    Edit Goal {goalID}
  </h1>
</div>
<div
  class="bg-blue-600 my-5 mx-5 rounded-md p-2 flex flex-row flex-wrap justify-center"
>
  {#each PersonalGoals as PersonalGoal}
    {console.log(PersonalGoal.id, goalID)}
    {#if PersonalGoal.id === goalID}
      <div class="bg-gray-300 mt-2 w-full rounded-md p-2">
        <p class="text-blue-800 font-semibold">Omschrijving:</p>
        <input
          type="text"
          class="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md pl-3 pr-3 shadow-sm
          focus:outline-none focus:border-blue-800 focus:ring-blue-800 focus:ring-1 sm:text-sm text-blue-800 font-semibold"
          bind:value={updatedOmschrijving}
        />
      </div>
      <div class="bg-gray-300 mt-2 w-full rounded-md p-2">
        <p class="text-blue-800 font-semibold">
          What do you want to improve on?
        </p>
        <p>{PersonalGoal.type}</p>
        <p class="text-red-500">Can not be changed!</p>
      </div>
      <div class="bg-gray-300 mt-2 w-full rounded-md p-2">
        <p class="text-blue-800 font-semibold">
          How much do you want to improve?
        </p>
        <input
          type="number"
          class="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md pl-3 pr-3 shadow-sm
          focus:outline-none focus:border-blue-800 focus:ring-blue-800 focus:ring-1 sm:text-sm text-blue-800 font-semibold"
          bind:value={updatedGoal}
        />
      </div>
      <div
        class="bg-red-700 mt-2 mr-2 w-min py-2 px-10 rounded-md border-4 border-blue-400 whitespace-nowrap"
      >
        <button on:click={deleteGoal} class="text-white font-semibold"
          >Delete</button
        >
      </div>
      <div
        class="bg-green-700 mt-2 w-min py-2 px-10 rounded-md border-4 border-blue-400 whitespace-nowrap"
      >
        <button class="text-white font-semibold" on:click={saveChanges}>
          Save
        </button>
      </div>
      <div
        class="bg-blue-700 mt-2 mr-2 w-min py-2 px-10 rounded-md border-4 border-blue-400 whitespace-nowrap"
      >
        <a href="../" class="text-white font-semibold">Back</a>
      </div>
    {/if}
  {/each}
</div>
