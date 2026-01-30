const grid = document.querySelector(".pokemon-grid");
const details = document.querySelector(".pokemon-details");
const container = document.querySelector(".pokedex-container");

let allPokemon = [];

async function fetchPokemon(id) {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
  return await res.json();
}

function createCard(pokemon) {
  const card = document.createElement("div");
  card.classList.add("card");

  card.innerHTML = `
    <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
    <h3>${pokemon.name}</h3>
    <p>#${pokemon.id}</p>
  `;

  card.addEventListener("click", () => showDetails(pokemon));
  grid.appendChild(card);
}

function showDetails(pokemon) {
  details.innerHTML = `
    <div class="details-header">
      <h2>${pokemon.name}</h2>
      <img src="${pokemon.sprites.other['official-artwork'].front_default}" width="140">
    </div>

    <div class="details-info">
      <p><strong>Type:</strong> ${pokemon.types.map(t => t.type.name).join(", ")}</p>
      <p><strong>Height:</strong> ${pokemon.height}</p>
      <p><strong>Weight:</strong> ${pokemon.weight}</p>
      <p><strong>Abilities:</strong> ${pokemon.abilities.map(a => a.ability.name).join(", ")}</p>
    </div>

    <div class="stats">
      <h3>Stats</h3>
      ${pokemon.stats.map(s => `<p>${s.stat.name}: ${s.base_stat}</p>`).join("")}
    </div>
  `;

  details.classList.remove("hidden");
  container.classList.add("show-details");
  details.scrollIntoView({ behavior: "smooth", block: "start" });

}

async function loadPokemon() {
  for (let i = 1; i <= 200; i++) {
    const pokemon = await fetchPokemon(i);
    allPokemon.push(pokemon);
    createCard(pokemon);
  }
}

loadPokemon();
