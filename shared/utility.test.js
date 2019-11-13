const { castToQueryOps, castEmbedded } = require("./utility");

test("converts nested operator keywords to mongodb operators", () => {
  const uncastQuery = {
    name: {
      eq: "Funny"
    },
    ingredients: {
      family: {
        in: ["Bourbon", "Rye"]
      }
    }
  };
  expect(castToQueryOps(uncastQuery)).toEqual({
    name: {
      $eq: "Funny"
    },
    ingredients: {
      family: {
        $in: ["Bourbon", "Rye"]
      }
    }
  });
});

test("converts object keys with underscores to keys with periods", () => {
  const uncastQuery = {
    name: {
      $eq: "Funny"
    },
    ingredients_ingredient: {
      family: {
        $in: ["Bourbon", "Rye"]
      }
    }
  };
  expect(castEmbedded(uncastQuery)).toEqual({
    name: {
      $eq: "Funny"
    },
    "ingredients.ingredient": {
      family: {
        $in: ["Bourbon", "Rye"]
      }
    }
  });
});
