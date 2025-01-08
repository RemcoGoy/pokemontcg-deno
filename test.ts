import { assertEquals, assertStringIncludes } from "jsr:@std/assert";

import { getApiClient, getClient } from "./mod.ts";

Deno.test("getClient has no API key", () => {
  const client = getClient();

  assertEquals(client.apiKey, "");
});

Deno.test("getApiClient has an API key", () => {
  const client = getApiClient("1234567890");

  assertEquals(client.apiKey, "1234567890");
});

Deno.test("find pokemon card", async () => {
  const client = getClient();

  const card = await client.cards.find("sv3pt5-1");

  assertEquals(card.name, "Bulbasaur");
});

Deno.test("find set information", async () => {
  const client = getClient();

  const set = await client.sets.find("sv3pt5");

  assertEquals(set.name, "151");
});

Deno.test("find all types", async () => {
  const client = getClient();

  const types = await client.types.all();

  assertEquals(types.length, 11);
});

Deno.test("find all pokemon cards with name Rotom", async () => {
  const client = getClient();

  const cards = await client.cards.all({ q: "name:Rotom" });

  for (const card of cards) {
    assertStringIncludes(card.name, "Rotom");
  }

  assertEquals(cards.length, 45);
});

Deno.test("find first 13 pokemon cards", async () => {
  const client = getClient();

  const cards = await client.cards.where({ pageSize: 13, page: 1 });

  assertEquals(cards.data.length, 13);
});
