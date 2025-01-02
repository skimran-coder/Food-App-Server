"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const foodAppRouter = express_1.default.Router();
foodAppRouter.get("/restaurants", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // const { lat, lng } = req.query;
    // console.log(lat, lng);
    // if (!lat || !lng) {
    //   res.status(400).json({ error: "Missing latitude or longitude" });
    //   return;
    // }
    try {
        const response = yield fetch(`https://www.swiggy.com/dapi/restaurants/list/v5?lat=${22.51800}&lng=${88.38320}&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING`, {
            headers: {
                "Content-Type": "application/json",
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36",
            },
        });
        const data = yield response.json();
        console.log(data);
        res.status(200).json(data);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            error: error,
        });
    }
}));
foodAppRouter.get("/menu", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { resid } = req.query;
        const response = yield fetch(`https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=22.51800&lng=88.38320&restaurantId=${resid}&catalog_qa=undefined&submitAction=ENTER`, {
            headers: {
                "Content-Type": "application/json",
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36",
            },
        });
        const data = yield response.json();
        res.status(200).json(data);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            error: error,
        });
    }
}));
foodAppRouter.get("/search", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { searchInput } = req.query;
        const response = yield fetch(`https://www.swiggy.com/dapi/restaurants/search/suggest?lat=22.51800&lng=88.38320&str=${searchInput}`);
        const data = yield response.json();
        res.status(200).json(data);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            error: error,
        });
    }
}));
exports.default = foodAppRouter;
