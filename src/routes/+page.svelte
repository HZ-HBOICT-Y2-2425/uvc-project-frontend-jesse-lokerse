<script>
  import "../app.css";
  import { onMount } from "svelte";
  let CurentUserId = 1;
  let Goals;
  let UserGoals;
  let Users;
  let PersonalGoals;
  onMount(async () => {
    try {
      Goals = await fetchData("goals");
      Users = await fetchData("users");
      UserGoals = await fetchData("userGoals");
      PersonalGoals = await fetchData("personalGoals")
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


  function claimReward(beloning, id) {
    
    console.log(beloning, "is toegevoegd");
    console.log("complete", id);
  }
</script>

<div class="header rounded-b-3xl bg-blue-600 text-center pb-5">
  <h1 class="text-7xl text-white">Goals</h1>
</div>

<div
  class="bg-blue-600 my-5 mx-5 rounded-md p-2 flex flex-row flex-wrap justify-center"
>
  <div
    class="bg-indigo-800 mt-2 mr-2 w-min py-2 px-10 rounded-md border-4 border-blue-400 whitespace-nowrap"
  >
    <p class="text-white font-semibold">Claim all</p>
  </div>
  <div
    class="bg-indigo-800 mt-2 w-min py-2 px-10 rounded-md border-4 border-blue-400 whitespace-nowrap"
  >
    <a href="/nieuwDoel" class="text-white font-semibold">Add Goal</a>
  </div>

  {#each Goals as goal}
    <!-- to be component doel-->
    <div class="bg-gray-300 mt-2 w-full rounded-md p-2">
      <div class="flex items-center justify-between mb-2">
        <p class="text-blue-800 font-semibold">{goal.omschrijving}</p>
        {#each UserGoals as UserGoal}
          {#if UserGoal.userId === CurentUserId && goal.id === UserGoal.GoalId && UserGoal.Progress === goal.goal}
            <button
              on:click={() => claimReward(goal.beloning, goal.id)}
              class="bg-indigo-800 text-white text-sm py-1 px-3 rounded-md border-4 border-blue-400"
            >
              Claim
            </button>
          {:else if UserGoal.userId === CurentUserId && goal.id === UserGoal.GoalId && UserGoal.Progress !== goal.goal}
            <p
              class="bg-indigo-600 text-white text-sm py-1 px-3 rounded-md border-4 border-blue-400"
            >
              Claim
            </p>
          {/if}
        {/each}
      </div>
      <div class="bg-blue-400 p-2 rounded-md flex">
        <div class="relative w-full h-8 rounded-md bg-blue-600">
          <p
            class="absolute inset-0 flex items-center justify-center text-white font-bold"
          >
            {#each UserGoals as UserGoal}
              {#if UserGoal.userId === CurentUserId && goal.id === UserGoal.GoalId}
                {UserGoal.Progress}/{goal.goal}
              {/if}
            {/each}
          </p>
          {#each UserGoals as UserGoal}
            {#if UserGoal.userId === CurentUserId && goal.id === UserGoal.GoalId}
              <div
                class="bg-indigo-800 h-full rounded-md"
                style="width: {(UserGoal.Progress / goal.goal) * 100}%;"
              ></div>
            {/if}
          {/each}
        </div>
        <p class="text-white ml-2 whitespace-nowrap">{goal.beloning} coins</p>
      </div>
    </div>
  {/each}

   {#each PersonalGoals as PersonalGoal}
  <div class="bg-gray-300 mt-2 w-full rounded-md p-2">
    <div class="flex items-center justify-between mb-2">
      <p class="text-blue-800 font-semibold">{PersonalGoal.omschrijving}</p>
      <div class="flex">
        <p
          class="bg-indigo-800 text-white text-sm py-1 px-3 mr-2 rounded-md border-4 border-blue-400"
        >
          Claim
        </p>
        <a
          class="bg-indigo-800 text-white text-sm py-1 px-3 rounded-md border-4 border-blue-400"
          href="/editDoel/{PersonalGoal.id}"
        >
          Edit
      </a>
      </div>
    </div>
    <div class="bg-blue-400 p-2 rounded-md flex">
      <div class="relative w-full h-8 rounded-md bg-blue-600">
        <p
          class="absolute inset-0 flex items-center justify-center text-white font-bold"
        >
          {PersonalGoal.progress}/{PersonalGoal.goal}
        </p>
        <div class="bg-indigo-800 h-full rounded-md" 
        style="width: {(PersonalGoal.progress / PersonalGoal.goal) * 100}%;"
        ></div>
      </div>
      <p class="text-white ml-2 whitespace-nowrap">5 coins</p>
    </div>
  </div>
  {/each}
</div>
