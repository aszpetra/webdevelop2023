import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Meter } from '../models/Meter';

@Injectable({
  providedIn: 'root'
})
export class MeterService {

  collectionName = 'Meters';

  constructor(private afs: AngularFirestore) { }

  create(meter: Meter) {
    meter.id = this.afs.createId();
    return this.afs.collection<Meter>(this.collectionName).doc(meter.id).set(meter);
  }

  getAll() {
    return this.afs.collection<Meter>(this.collectionName).valueChanges();
  }

  getById(id:string) {
    return this.afs.collection<Meter>(this.collectionName).doc(id).valueChanges();
  }

  getMetersByUserId(userId: string) {
    return this.afs.collection<Meter>(this.collectionName, ref => ref.where('user_id', '==', userId).orderBy('name', 'asc')).valueChanges();

  }

  updateCurrent(meterId: string, newCurrent: number) {
    return this.afs.collection<Meter>(this.collectionName).doc(meterId).update({current: newCurrent});
  }
}
