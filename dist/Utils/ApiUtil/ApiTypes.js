"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// All possible endpoints for the API. This will generate autocomplete when using the Request function
// The commented code below is an example from my previous "CitizenTaxi" project to illustrate how this works
// export type ApiEndpoints<Param extends TParam = undefined> =
//   | `bookings` // [GET, POST]
//   | `bookings?citizenId=${Param}` // [GET] Guid
//   | `bookings/${Param}` // [GET, PUT, DELETE] Guid bookingId
//   | `notes` // [GET, POST]
//   | `notes?citizenId=${Param}` // [GET] Guid
//   | `notes/${Param}` // [GET, PUT, DELETE] Guid noteId
//   | `users` // [GET, POST]
//   | `users?role=${Param}` // [GET] enum Role
//   | `users/${Param}` // [GET, PUT, DELETE] Guid userId
//   | `users/authenticate`; // [POST, DELETE]
