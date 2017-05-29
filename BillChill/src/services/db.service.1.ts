import { Injectable } from '@angular/core';  
import * as PouchDB from 'pouchdb';  
import cordovaSqlitePlugin from 'pouchdb-adapter-cordova-sqlite';

window["PouchDB"] = PouchDB; 

@Injectable()
export class DBService1 {  
    private _db1;
    private _Ausgaben;
    
  

    initDB() {
        PouchDB.plugin(cordovaSqlitePlugin);
        this._db1 = new PouchDB('Ausgaben.db', { adapter: 'cordova-sqlite' });
        
    }

add(data) {  
    return this._db1.post(data);
}   

update(data) {  
    return this._db1.put(data);
}

delete(data) {  
    return this._db1.remove(data);
}

getAll() {  

    if (!this._Ausgaben) {
        return this._db1.allDocs({ include_docs: true})
            .then(docs => {

                // Each row has a .doc object and we just want to send an 
                // array of birthday objects back to the calling controller,
                // so let's map the array to contain just the .doc objects.

                this._Ausgaben = docs.rows.map(row => {
                    // Dates are not automatically converted from a string.
                    row.doc.Date = new Date(row.doc.Date);
                    return row.doc;
                });

                // Listen for changes on the database.
                this._db1.changes({ live: true, since: 'now', include_docs: true})
                    .on('change', this.onDatabaseChange);

                 return this._Ausgaben;
            });
    } else {
        // Return cached data as a promise
        return Promise.resolve(this._Ausgaben);
    }
}




private onDatabaseChange = (change) => {  
    var index = this.findIndex(this._Ausgaben, change.id);
    var Ausgaben = this._Ausgaben[index];

    if (change.deleted) {
        if (Ausgaben) {
            this._Ausgaben.splice(index, 1); // delete
        }
    } else {
        change.doc.Date = new Date(change.doc.Date);
        if (Ausgaben && Ausgaben._id === change.id) {
            this._Ausgaben[index] = change.doc; // update
        } else {
            this._Ausgaben.splice(index, 0, change.doc) // insert
        }
    }
}

// Binary search, the array is by default sorted by _id.
private findIndex(array, id) {  
    var low = 0, high = array.length, mid;
    while (low < high) {
    mid = (low + high) >>> 1;
    array[mid]._id < id ? low = mid + 1 : high = mid
    }
    return low;
}

  
   }