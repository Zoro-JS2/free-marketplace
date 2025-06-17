// import { CommonModule } from '@angular/common';
// import { Component } from '@angular/core';
// import { FormsModule } from '@angular/forms';
// import { NavComponent } from '../nav/nav.component';

// @Component({
//   selector: 'app-carcreate',
//   imports: [CommonModule, FormsModule, NavComponent],
//   templateUrl: './carcreate.component.html',
//   styleUrl: './carcreate.component.scss',
// })
// export class CarcreateComponent {
//   brand = '';
//   model = '';
//   carFolders: { [brand: string]: string[] } = {};
//   objectKeys = Object.keys;

//   ngOnInit() {
//     if (typeof window !== 'undefined') {
//       const saved = localStorage.getItem('carFolders');
//       if (saved) {
//         this.carFolders = JSON.parse(saved);
//       }
//     }
//   }
//   addCar() {
//     const brandKey = this.brand.trim().toUpperCase();
//     const modelKey = this.model.trim().toLowerCase().replace(/\s+/g, '');

//     if (!this.carFolders[brandKey]) {
//       this.carFolders[brandKey] = [];
//     }

//     if (!this.carFolders[brandKey].includes(modelKey)) {
//       this.carFolders[brandKey].push(modelKey);
//     }

//     this.saveToStorage();
//     this.brand = '';
//     this.model = '';
//   }

//   deleteModel(brand: string, model: string) {
//     this.carFolders[brand] = this.carFolders[brand].filter((m) => m !== model);
//     if (this.carFolders[brand].length === 0) {
//       delete this.carFolders[brand];
//     }
//     this.saveToStorage();
//   }

//   deleteBrand(brand: string) {
//     delete this.carFolders[brand];
//     this.saveToStorage();
//   }

//   saveToStorage() {
//     localStorage.setItem('carFolders', JSON.stringify(this.carFolders));
//   }
// }
import { Component, OnInit } from '@angular/core';
import { CarApiService } from '../../services/car-api.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavComponent } from '../nav/nav.component';

@Component({
  selector: 'app-carcreate',
  standalone: true,
  imports: [CommonModule, FormsModule, NavComponent],
  templateUrl: './carcreate.component.html',
  styleUrl: './carcreate.component.scss',
})
export class CarcreateComponent implements OnInit {
  brand = '';
  model = '';
  carFolders: { [brand: string]: string[] } = {};
  objectKeys = Object.keys;

  constructor(private carApi: CarApiService) {}

  ngOnInit() {
    this.loadCars();
  }

  loadCars() {
    this.carApi.getCars().subscribe((cars) => {
      this.carFolders = {};
      for (const car of cars) {
        this.carFolders[car.brand] = car.models;
      }
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
}
