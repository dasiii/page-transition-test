<script setup lang="ts">
import { onMounted, ref } from "vue";
import { RouterLink } from "vue-router";
import type { Pokemon, ListResponse, DetailResponse } from "@/types/pokemon";

const pokemonList = ref<Pokemon[] | undefined>([]);
const loading = ref<boolean>(true);

onMounted(async () => {
  const listResponse = await fetch(
    `https://pokeapi.co/api/v2/pokemon?limit=9&offset=${
      Math.floor(Math.random() * 1000) + 1
    }`
  );
  let { results }: { results: ListResponse[] } = await listResponse.json();
  results = results.slice(0, 9);

  const detailResults: DetailResponse[] = await Promise.all(
    results.map((p) => {
      return fetch(p.url).then((res) => res.json());
    })
  );

  detailResults.forEach((detail) => {
    const p = results.find((i) => i.name === detail.name);
    if (!p) return;
    const pokemon: Pokemon = {
      id: detail.id,
      ...p,
      name: p.name.charAt(0).toUpperCase() + p.name.slice(1),
      image: detail.sprites?.other?.["official-artwork"]?.["front-default"]
        ? detail.sprites.other["official-artwork"]["front-default"]
        : detail.sprites.front_default,
    };
    if (pokemonList.value) {
      pokemonList.value.push(pokemon);
    }

    loading.value = false;
  });
});
</script>

<template>
  <main class="bg-pink-100">
    <div v-if="loading" class="h-screen flex justify-center items-center">
      <svg
        role="status"
        class="w-8 h-8 mr-2 text-pink-500 animate-spin fill-emerald-600"
        viewBox="0 0 100 101"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
          fill="currentColor"
        />
        <path
          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
          fill="currentFill"
        />
      </svg>
    </div>
    <ul v-else class="h-screen grid grid-cols-3 gap-2 content-evenly">
      <li v-for="pokemon in pokemonList" :key="pokemon.name">
        <router-link :to="`/${pokemon.id}`">
          <div
            class="max-w-sm bg-emerald-700 hover:bg-emerald-800 rounded-lg border border-gray-200 shadow-md mx-5"
          >
            <img class="rounded-t-lg mx-auto" :src="pokemon.image" alt="" />
            <div class="p-5">
              <h5
                class="mb-2 text-2xl font-bold tracking-tight text-emerald-50 text-center"
              >
                {{ pokemon.name }}
              </h5>
            </div>
          </div>
        </router-link>
      </li>
    </ul>
  </main>
</template>
