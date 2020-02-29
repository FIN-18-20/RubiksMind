<template>
  <div>
    <div
      class="flex items-center justify-center mt-1 bg-blue-800 border border-blue-700 rounded-md"
      style="width:450px;height:550px;"
    >
      <div class="box-styles py-5 px-8 rounded-md sm:px-10" style="width:420px;height:512px;">
        <div class="flex items-center justify-center mb-2">
          <hr style="width:50px;" class="border-blue-200" />
          <h4 class="mx-2 text-base italic text-blue-200">
            Register
          </h4>
          <hr style="width:50px;" class="border-blue-200" />
        </div>

        <div>
          <label for="email" class="ml-1 block text-xs font-medium leading-5 text-blue-600">
            Email address
          </label>
          <div class="mt-1 rounded-md shadow-sm">
            <input id="email" type="email" required class="bg-blue-1000 text-blue-300 appearance-none block w-full px-3 py-2 border border-blue-1000 rounded-md placeholder-blue-500 focus:outline-none focus:border-blue-500 transition duration-150 ease-in-out sm:text-sm sm:leading-5" />
          </div>
        </div>

        <div class="mt-2">
          <label for="password" class="ml-1 block text-xs font-medium leading-5 text-blue-600">
            Password
          </label>
          <div class="mt-1 rounded-md shadow-sm">
            <input id="password" type="password" required class="bg-blue-1000 text-blue-300 appearance-none block w-full px-3 py-2 border border-blue-1000 rounded-md placeholder-blue-500 focus:outline-none focus:border-blue-500 transition duration-150 ease-in-out sm:text-sm sm:leading-5" />
          </div>
        </div>

        <div class="mt-2">
          <label for="password" class="ml-1 block text-xs font-medium leading-5 text-blue-600">
            Confirm Password
          </label>
          <div class="mt-1 rounded-md shadow-sm">
            <input id="password" type="password" required class="bg-blue-1000 text-blue-300 appearance-none block w-full px-3 py-2 border border-blue-1000 rounded-md placeholder-blue-500 focus:outline-none focus:border-blue-500 transition duration-150 ease-in-out sm:text-sm sm:leading-5" />
          </div>
        </div>

        <div class="mt-5">
          <span class="block w-full rounded-md shadow-sm">
            <button type="submit" class="w-full flex justify-center py-3 px-4 text-base text-blue-100 rounded-md button-bg focus:outline-none transition duration-150 ease-in-out">
              Register
            </button>
          </span>
        </div>

        <div class="mt-5">
          <div class="flex items-center justify-center mb-3">
            <hr style="width:50px;" class="border-blue-200" />
            <h4 class="mx-2 text-sm italic text-blue-200">
              Or connect with
            </h4>
            <hr style="width:50px;" class="border-blue-200" />
          </div>

          <div class="mt-4 grid grid-cols-2 gap-4">
            <div>
              <span class="w-full h-12 inline-flex rounded-md shadow-sm" style="padding:2px;background-image:linear-gradient(90deg, rgba(7,201,104,1) 0%, rgba(231,69,57,1) 50%, rgba(228,173,69,1) 100%);">
                <button type="button" class="w-full inline-flex justify-center items-center py-1 px-3 rounded-md bg-blue-100 text-blue-900 hover:text-blue-600 focus:outline-none transition duration-150 ease-in-out">
                  <svg class="h-4 w-4">
                    <use xlink:href="#google-logo" />
                  </svg>
                  <span class="text-xs ml-2 leading-5 font-medium">Login with Google</span>
                </button>
              </span>
            </div>
            <div>
              <span class="w-full h-12 inline-flex rounded-md shadow-sm" style="padding:2px;background-color:#1B1F23;">
                <button type="button" class="w-full inline-flex justify-center items-center py-1 px-3 rounded-md bg-blue-100 text-blue-900 hover:text-blue-600 focus:outline-none transition duration-150 ease-in-out">
                  <svg class="h-4 w-4">
                    <use xlink:href="#github-logo" />
                  </svg>
                  <span class="text-xs ml-2 leading-5 font-medium">Login with Github</span>
                </button>
              </span>
            </div>
            <div>
              <span class="w-full h-12 inline-flex rounded-md shadow-sm" style="padding:2px;background-color:#1DA1F2">
                <button type="button" class="w-full inline-flex justify-center items-center py-1 px-3 rounded-md bg-blue-100 hover:font-semi-bold text-blue-900 hover:text-blue-600 focus:outline-none transition duration-150 ease-in-out">
                  <svg class="h-4 w-4">
                    <use xlink:href="#twitter-logo" />
                  </svg>
                  <span class="text-xs ml-2 leading-5 font-medium">Login with Twitter</span>
                </button>
              </span>
            </div>
            <div>
              <span class="w-full h-12 inline-flex rounded-md shadow-sm" style="padding:2px;background-color:#7289DA;">
                <button type="button" class="w-full inline-flex justify-center items-center py-1 px-3 rounded-md bg-blue-100 text-blue-900 hover:text-blue-600 focus:outline-none transition duration-150 ease-in-out">
                  <svg class="h-4 w-4">
                    <use xlink:href="#discord-logo" />
                  </svg>
                  <span class="text-xs ml-2 leading-5 font-medium">Login with Discord</span>
                </button>
              </span>
            </div>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .box-styles {
    background: linear-gradient(181.21deg, #2a4365 0.81%, #1f3451 89.6%);
    box-shadow: 1px 2px 4px rgba(0, 0, 0, 0.25);
    scrollbar-width: none;
  }

  .button-bg {
    background: linear-gradient(105.11deg, #7bbae0 -6.07%, #1a6fbf 93.36%);
  }
  .button-bg:hover {
    background: linear-gradient(105.11deg, #64a0c5 -6.07%, #105697 93.36%);
  }
</style>