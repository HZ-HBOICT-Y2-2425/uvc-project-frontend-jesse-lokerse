<script>
    import "../../app.css";
</script>

<div class='header rounded-b-3xl bg-blue-600 text-center pb-5'>
    <h1 class='text-7xl text-white whitespace-nowrap'>Add Goal</h1>
</div>

<div class='bg-blue-600 my-5 mx-5 rounded-md p-2 flex flex-row flex-wrap justify-center'>
    <div class='bg-gray-300 mt-2 w-full rounded-md p-2'>
        <p class='text-blue-800 font-semibold'>
            Give a discription of the goal
        </p>
        <input type='text' class='placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md pl-3 pr-3 shadow-sm 
        focus:outline-none focus:border-blue-800 focus:ring-blue-800 focus:ring-1 sm:text-sm text-blue-800 font-semibold'>
    </div>

    <div class='bg-gray-300 mt-2 w-full rounded-md p-2'>
        <p class='text-blue-800 font-semibold'>
            What do you want to improve on?
        </p>
        <div class="space-y-3">
            <div class="flex items-center">
              <input type="radio" id="time" name="option" class="mr-2">
              <label for="time" class="text-blue-800 font-medium">Time in seconds</label>
            </div>
            <div class="flex items-center">
              <input type="radio" id="temp" name="option" class="mr-2">
              <label for="temp" class="text-blue-800 font-medium">Temperature in &deg;C</label>
            </div>
            <div class="flex items-center">
              <input type="radio" id="water" name="option" class="mr-2">
              <label for="water" class="text-blue-800 font-medium">Water usage in liters</label>
            </div>
          </div>
    </div>

    <div class='bg-gray-300 mt-2 w-full rounded-md p-2'>
        <p class='text-blue-800 font-semibold'>
            How much do you want to inprove?
        </p>
        <input type='number' class='placeholder:italic placeholder:text-slate-400 block bg-white border border-slate-300 rounded-md pl-3 pr-3 shadow-sm 
        focus:outline-none focus:border-blue-800 focus:ring-blue-800 focus:ring-1 sm:text-sm text-blue-800 font-semibold'>
    </div>

    <div class='bg-gray-300 mt-2 w-full rounded-md p-2'>
        <p class='text-blue-800 font-semibold'>
            What will be your deadline?
        </p>
        <input type='date'class='placeholder:italic placeholder:text-slate-400 block bg-white border border-slate-300 rounded-md pl-3 pr-3 shadow-sm 
        focus:outline-none focus:border-blue-800 focus:ring-blue-800 focus:ring-1 sm:text-sm text-blue-800 font-semibold'>
    </div>

    <div class='bg-red-700 mt-2 mr-2 w-min py-2 px-10 rounded-md border-4 border-blue-400 whitespace-nowrap'>
        <a href='../' class='text-white font-semibold'>Cancel</a>
    </div>
    <div class='bg-green-700 mt-2 w-min py-2 px-10 rounded-md border-4 border-blue-400 whitespace-nowrap'>
        <p class='text-white font-semibold'>Submit</p>
    </div>
</div>