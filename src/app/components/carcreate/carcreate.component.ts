import { Component, OnInit } from '@angular/core';
import { CarApiService } from '../../services/car-api.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavComponent } from '../nav/nav.component';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-carcreate',
  standalone: true,
  imports: [CommonModule, FormsModule, NavComponent, MatIconModule],
  templateUrl: './carcreate.component.html',
  styleUrl: './carcreate.component.scss',
})
export class CarcreateComponent implements OnInit {
  brand = '';
  model = '';
  searchTerm: string = '';
  serverError: boolean = false;
  constructor(private carApi: CarApiService) {}
  expandedBrands: { [brand: string]: boolean } = {};
  carFolders: { [brand: string]: string[] } = {};
  objectKeys = Object.keys;

  ngOnInit() {
    this.loadCars();
  }

  loadCars() {
    this.carApi.getCars().subscribe({
      next: (cars) => {
        this.carFolders = {};
        for (const car of cars) {
          this.carFolders[car.brand] = car.models;
        }
        this.serverError = false;
      },
      error: (err) => {
        console.error('Помилка з’єднання з сервером:', err);
        this.serverError = true;
      },
    });
  }

  addCar() {
    this.carApi.addCar(this.brand, this.model).subscribe(() => {
      this.loadCars();
      this.brand = '';
      this.model = '';
    });
  }

  deleteModel(brand: string, model: string) {
    this.carApi.deleteModel(brand, model).subscribe(() => {
      this.loadCars();
    });
  }

  deleteBrand(brand: string) {
    const models = this.carFolders[brand] || [];
    models.forEach((model) => {
      this.carApi.deleteModel(brand, model).subscribe(() => this.loadCars());
    });
  }
  findBrand(brand: string, model: string) {
    const query = `${brand} ${model}`;
    const url = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
    window.open(url, '_blank'); // откроет в новой вкладке
  }
  toggleBrand(brand: string) {
    this.expandedBrands[brand] = !this.expandedBrands[brand];
  }
  get filteredCarFolders() {
    const term = this.searchTerm.trim().toLowerCase();

    if (!term) return this.carFolders;

    const filtered: { [brand: string]: string[] } = {};

    for (const brand of Object.keys(this.carFolders)) {
      const lowerBrand = brand.toLowerCase();

      // Если совпадает марка
      if (lowerBrand.includes(term)) {
        filtered[brand] = this.carFolders[brand];
        continue;
      }

      // Если совпадает модель
      const matchedModels = this.carFolders[brand].filter((model) =>
        model.toLowerCase().includes(term)
      );

      if (matchedModels.length > 0) {
        filtered[brand] = matchedModels;
      }
    }

    return filtered;
  }
}
