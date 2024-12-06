<script>
    import "../app.css";
</script>

<div class='header rounded-b-3xl bg-blue-600 text-center pb-5'>
    <h1 class='text-7xl text-white'>Goals</h1>
</div>

<div class='bg-blue-600 my-5 mx-5 rounded-md p-2 flex flex-row flex-wrap justify-center'>

    <div class='bg-indigo-800 mt-2 mr-2 w-min py-2 px-10 rounded-md border-4 border-blue-400 whitespace-nowrap'>
        <p class='text-white font-semibold'>Claim all</p>
    </div>
    <div class='bg-indigo-800 mt-2 w-min py-2 px-10 rounded-md border-4 border-blue-400 whitespace-nowrap'>
        <a href='/nieuwDoel' class='text-white font-semibold'>Add Goal</a>
    </div>

<!-- to be component doel-->
    <div class='bg-gray-300 mt-2 w-full rounded-md p-2'>
        <div class="flex items-center justify-between mb-2">
            <p class='text-blue-800 font-semibold'>[doel.beschrijving]</p>
            <p class='bg-indigo-600 text-white text-sm py-1 px-3 rounded-md border-4 border-blue-400'>
            Claim
            </p>
        </div>
        <div class='bg-blue-400 p-2 rounded-md flex'>
            <div class="relative w-full h-8 rounded-md bg-blue-600">
                <p class="absolute inset-0 flex items-center justify-center text-white font-bold">
                1/3
                </p>
                <div class="bg-indigo-800 h-full rounded-md" style="width: 33%;"></div>
            </div>
            <p class='text-white ml-2  whitespace-nowrap'>5 coins</p>
        </div>
    </div>

<!-- to be component persoonlijk doel -->
    <div class='bg-gray-300 mt-2 w-full rounded-md p-2'>
        <div class="flex items-center justify-between mb-2">
            <p class='text-blue-800 font-semibold'>[doel.beschrijving]</p>
            <div class='flex'>
                <p class='bg-indigo-800 text-white text-sm py-1 px-3 mr-2 rounded-md border-4 border-blue-400'>
                    Claim
                    </p>
                    <p class='bg-indigo-800 text-white text-sm py-1 px-3 rounded-md border-4 border-blue-400'>
                        Edit
                    </p>
            </div>
        </div>
        <div class='bg-blue-400 p-2 rounded-md flex'>
            <div class="relative w-full h-8 rounded-md bg-blue-600">
                <p class="absolute inset-0 flex items-center justify-center text-white font-bold">
                3/3
                </p>
                <div class="bg-indigo-800 h-full rounded-md" style="width: 100%;"></div>
            </div>
            <p class='text-white ml-2  whitespace-nowrap'>5 coins</p>
        </div>
    </div>

</div>
