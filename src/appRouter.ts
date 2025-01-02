import express, { Request, Response } from "express";

const appRouter = express.Router();

appRouter.get("/restaurants", async (req: Request, res: Response) => {
  console.log(req.query);
  const { lat, lng } = req.query;

  console.log(lat, lng);

  if (!lat || !lng) {
    res.status(400).json({ error: "Missing latitude or longitude" });
    return;
  }

  try {
    const response = await fetch(
      `https://www.swiggy.com/dapi/restaurants/list/v5?lat=${lat}&lng=${lng}&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING`,
      {
        headers: {
          "Content-Type": "application/json",
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36",
        },
      }
    );

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: error,
    });
  }
});

appRouter.get("/menu", async (req: Request, res: Response) => {
  try {
    const { resid, lat, lng } = req.query;
    console.log(resid);

    const response = await fetch(
      `https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=${lat}&lng=${lng}&restaurantId=${resid}&catalog_qa=undefined&submitAction=ENTER`,
      {
        headers: {
          "Content-Type": "application/json",
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36",
        },
      }
    );

    const data = await response.json();
    console.log(data);

    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: error,
    });
  }
});

appRouter.get("/search", async (req: Request, res: Response) => {
  try {
    const { searchInput, lat, lng } = req.query;
    console.log(searchInput);

    const response = await fetch(
      `https://www.swiggy.com/dapi/restaurants/search/suggest?lat=${lat}&lng=${lng}&str=${searchInput}`,
      {
        headers: {
          "Content-Type": "application/json",
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36",
        },
      }
    );

    console.log(response);
    const data = await response.json();
    console.log("parse hogya");
    console.log(data);

    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: error,
    });
  }
});

appRouter.get("/position", async (req: Request, res: Response) => {
  try {
    const { lat, lng } = req.query;

    const response = await fetch(
      `https://www.swiggy.com/dapi/misc/address-recommend?latlng=${lat},${lng}`,
      {
        headers: {
          "Content-Type": "application/json",
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36",
        },
      }
    );

    console.log(response);
    const data = await response.json();
    console.log("parse hogya");
    console.log(data);

    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: error,
    });
  }
});

appRouter.get("/address", async (req: Request, res: Response) => {
  try {
    const { id } = req.query;

    const response = await fetch(
      `https://www.swiggy.com/dapi/misc/address-recommend?place_id=${id}`,
      {
        headers: {
          "Content-Type": "application/json",
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36",
        },
      }
    );

    console.log(response);
    const data = await response.json();
    console.log("parse hogya");
    console.log(data);

    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: error,
    });
  }
});

appRouter.get("/placeSuggestion", async (req: Request, res: Response) => {
  try {
    const { searchInput } = req.query;

    const response = await fetch(
      `https://www.swiggy.com/dapi/misc/place-autocomplete?input=${searchInput}`,
      {
        headers: {
          "Content-Type": "application/json",
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36",
        },
      }
    );

    console.log(response);
    const data = await response.json();
    console.log("parse hogya");
    console.log(data);

    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: error,
    });
  }
});

export default appRouter;
