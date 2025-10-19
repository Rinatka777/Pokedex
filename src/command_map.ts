import type { State } from "./state.js";

export async function commandMapForward(state:State){
    const locations = await state.pokeapi.fetchLocations(state.nextLocationsURL);
      state.nextLocationsURL = locations.next;
      state.prevLocationsURL = locations.previous;
      for (const loc of locations.results) {
        console.log(loc.name);
  }
}

export async function commandMapBack(state:State){
    if (!state.prevLocationsURL) {
        throw new Error("No previous locations available");
    }
    const locations = await state.pokeapi.fetchLocations(state.prevLocationsURL);
    state.nextLocationsURL = locations.next;
    state.prevLocationsURL = locations.previous;
    for (const loc of locations.results) {
        console.log(loc.name);
    }
}