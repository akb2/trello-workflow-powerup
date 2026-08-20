window.TrelloPowerUp.initialize({
  "card-buttons": async (t) => {
    const card = await t.card("idList");

    console.log(card);

    return [];
  },
});