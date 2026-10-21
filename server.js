const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());

app.get("/hurricanes", async (req, res) => {
    try {
        const response = await fetch(
            "https://www.nhc.noaa.gov/CurrentStorms.json"
        );

        if (!response.ok) {
            throw new Error("NHC request failed: " + response.status);
        }

        const data = await response.json();

        res.json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: "Could not get hurricane data"
        });
    }
});

const port = process.env.PORT || 3000;

app.listen(port, "0.0.0.0", () => {
    console.log("Hurricane server is running on port " + port);
});