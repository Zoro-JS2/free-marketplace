const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

mongoose
  .connect("mongodb://localhost:27017/cars")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB error:", err));

const carSchema = new mongoose.Schema({
  brand: String,
  models: [String],
});

const Car = mongoose.model("Car", carSchema);

// Получить все марки и модели
app.get("/api/cars", async (req, res) => {
  const cars = await Car.find();
  res.json(cars);
});

// Добавить или обновить марку и модель
app.post("/api/cars", async (req, res) => {
  const { brand, model } = req.body;
  const upperBrand = brand.trim().toUpperCase();
  const lowerModel = model.trim().toLowerCase().replace(/\s+/g, "");

  let car = await Car.findOne({ brand: upperBrand });
  if (!car) {
    car = new Car({ brand: upperBrand, models: [lowerModel] });
  } else if (!car.models.includes(lowerModel)) {
    car.models.push(lowerModel);
  }
  await car.save();
  res.json(car);
});

// Удалить модель
app.delete("/api/cars/:brand/:model", async (req, res) => {
  const brand = req.params.brand;
  const model = req.params.model;

  const car = await Car.findOne({ brand });
  if (car) {
    car.models = car.models.filter((m) => m !== model);
    if (car.models.length === 0) {
      await Car.deleteOne({ brand });
    } else {
      await car.save();
    }
  }
  res.sendStatus(204);
});

app.listen(3000, () => console.log("Server running on port 3000"));
