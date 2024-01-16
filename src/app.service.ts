import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}

// type order = {
//   products: [
//     {
//       id: 1;
//       name: 'Makimono P';
//       price: '25.0';
//       count: 1
//     },
//     {
//       id: 2;
//       name: 'Makimono M';
//       price: '35.0';
//       count: 1
//     },
//   ];
//   userId: 2;
//   addressId?: 3;
//   paymentType: 'cash';
//   preferences: '';
//   status: 'canceled' | 'running' | 'done';
// };
