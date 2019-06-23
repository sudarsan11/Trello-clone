import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import * as constants from '../constants';
const url = constants.URL.url;

@Injectable({providedIn: 'root'})
export class ListService {

  constructor(public http: HttpClient) {}

  // Add a new card to list by _id
  createCard(listID: string, card: any) {

    // Send a POST request with card data
    this.http.post<{message: string}>(url + 'api/list/create-card/' + listID, card)
      .subscribe(res => {
        console.log(res);
      }, err => {
        alert('Something went wrong');
        console.log(err);
      });
  }

  // Delete existing card
  deleteCard(listID: string, cardID: string) {

    // Send a DELETE request with card id and list id
    this.http.delete<{}>(url + 'api/list/delete-card/' + listID + '/' + cardID)
      .subscribe(res => {
        console.log(res);
      }, err => {
        alert('Something went wrong');
        console.log(err);
      });
  }

  // Update existing card
  updateCard(listID: string, cardID: string, card: any) {

    // Send a POST request with card id, list id and card data
    this.http.post<{message: string}>(url + 'api/list/update-card/' + listID + '/' + cardID, card)
    .subscribe(res => {
      console.log(res);
    }, err => {
      alert('Something went wrong');
      console.log(err);
    });
  }

  // Fetch all the lists with cards
  fetchLists() {
    return this.http.get<{message: string, fetchedLists: any}>(url + 'api/list/fetch-lists').pipe();
  }

  // Create a new list
  createList(list: any) {
    return this.http.post<{message: string, createdList: any}>(url + 'api/list/create-list', list).pipe();
  }

  // Drag cards within list
  updateList(list: any, listID: string) {
    return this.http.post<{meesage: string}>(url + 'api/list/update-list/' + listID, list).pipe();
  }

}
