import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Reading } from '../models/Reading';

@Injectable({
  providedIn: 'root'
})
export class ReadingService {

  collectionName = 'Readings';

  constructor(private afs: AngularFirestore) { }

  create(reading: Reading) {
    reading.id = this.afs.createId();
    return this.afs.collection<Reading>(this.collectionName).doc(reading.id).set(reading);
  }

  getAll() {
      return this.afs.collection<Reading>(this.collectionName).valueChanges();
  }

  getReadingsByUserId(userId: string) {
    return this.afs.collection<Reading>(this.collectionName, ref => ref.where('user_id', '==', userId).orderBy('date', 'desc')).valueChanges();
  }

  delete(id: string) {
    return this.afs.collection<Reading>(this.collectionName).doc(id).delete();
  }


}
