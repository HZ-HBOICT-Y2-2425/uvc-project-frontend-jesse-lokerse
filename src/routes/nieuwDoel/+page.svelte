<script>
    import { onMount } from "svelte";
    import "../../app.css";
  
    let newPersonalGoal = {Omschrijving: '', Type: '', Goal: '', userId: 1, claimed: false}; // Holds new goal data
    let CurentUserId = 1;
    let Goals;
    let UserGoals;
    let Users;
    let PersonalGoals;
    let newGoal = 0;
    let newOmschrijving = '';
    let newType = ''; 
  
    onMount(async () => {
      try {
        Goals = await fetchData("goals");
        Goals = await fetchData("goals"); // Redundant fetch, you only need one
        Users = await fetchData("users");
        UserGoals = await fetchData("userGoals");
        PersonalGoals = await fetchData("personalGoals");
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
        throw error; // Rethrow the error so it can be caught by the caller
      }
    }
  
    const addPersonalGoal = async () => {
        const newPersonalGoal = {
            omschrijving: newOmschrijving, 
            type: newType, 
            goal: parseInt(newGoal, 10),
            userId: CurentUserId, 
            claimed: false
        };

        // Validate input
        if (!newPersonalGoal.omschrijving || !newPersonalGoal.type || newPersonalGoal.goal === undefined) {
            alert("Please fill in all fields.");
            return;
        }
        console.log(newPersonalGoal)
        try {
            console.log()
            const response = await fetch("http://localhost:3011/personalGoals", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newPersonalGoal),
            });

            if (!response.ok) {
                const errorMessage = await response.text();
                throw new Error(`HTTP Error: ${response.status} - ${errorMessage}`);
            }

            const savedGoal = await response.json();
            PersonalGoals = [...(PersonalGoals || []), savedGoal]; // Add the new goal to the list safely

            // Reset form fields
            newOmschrijving = "";
            newType = "";
            newGoal = 0;

            console.log("Goal added successfully:", savedGoal);
        } catch (error) {
            alert("Failed to save goal. " + error.message);
            console.error("Error adding personal goal:", error);
        }
    };
</script>

<div class="header rounded-b-3xl bg-blue-600 text-center pb-5">
  <h1 class="text-7xl text-white whitespace-nowrap">Add Goal</h1>
</div>

<div
  class="bg-blue-600 my-5 mx-5 rounded-md p-2 flex flex-row flex-wrap justify-center"
>
  <div class="bg-gray-300 mt-2 w-full rounded-md p-2">
    <p class="text-blue-800 font-semibold">Give a description of the goal</p>
    <input
      type="text"
      class="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md pl-3 pr-3 shadow-sm
          focus:outline-none focus:border-blue-800 focus:ring-blue-800 focus:ring-1 sm:text-sm text-blue-800 font-semibold"
      bind:value={newOmschrijving}
    />
  </div>

  <div class="bg-gray-300 mt-2 w-full rounded-md p-2">
    <p class="text-blue-800 font-semibold">What do you want to improve on?</p>
    <div class="space-y-3">
      <div class="flex items-center">
        <input
          type="radio"
          id="time"
          name="option"
          value="time"
          bind:group={newType}
          class="mr-2"
        />
        <label for="time" class="text-blue-800 font-medium"
          >Time in seconds</label
        >
      </div>
      <div class="flex items-center">
        <input
          type="radio"
          id="temp"
          name="option"
          value="temperature"
          bind:group={newType}
          class="mr-2"
        />
        <label for="temp" class="text-blue-800 font-medium"
          >Temperature in &deg;C</label
        >
      </div>
      <div class="flex items-center">
        <input
          type="radio"
          id="water"
          name="option"
          value="water"
          bind:group={newType}
          class="mr-2"
        />
        <label for="water" class="text-blue-800 font-medium"
          >Water usage in liters</label
        >
      </div>
    </div>
  </div>

  <div class="bg-gray-300 mt-2 w-full rounded-md p-2">
    <p class="text-blue-800 font-semibold">How much do you want to improve?</p>
    <input
      type="number"
      class="placeholder:italic placeholder:text-slate-400 block bg-white border border-slate-300 rounded-md pl-3 pr-3 shadow-sm
          focus:outline-none focus:border-blue-800 focus:ring-blue-800 focus:ring-1 sm:text-sm text-blue-800 font-semibold"
      bind:value={newGoal}
    />
  </div>

  <div
    class="bg-red-700 mt-2 mr-2 w-min py-2 px-10 rounded-md border-4 border-blue-400 whitespace-nowrap"
  >
    <a href="../" class="text-white font-semibold">Home</a>
  </div>
  <div
    class="bg-green-700 mt-2 w-min py-2 px-10 rounded-md border-4 border-blue-400 whitespace-nowrap"
  >
    <button on:click={addPersonalGoal} class="text-white font-semibold"
      >Submit</button
    >
  </div>
</div>
