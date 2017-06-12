import { Injectable } from '@angular/core';  
import * as PouchDB from 'pouchdb';  
import cordovaSqlitePlugin from 'pouchdb-adapter-cordova-sqlite';
window["PouchDB"] = PouchDB; 
<<<<<<< HEAD

=======
//PouchDB.plugin(require('pouchdb-find'));
>>>>>>> origin/master
@Injectable()
export class DBService {  
    private _db0;
    private _Groups;
    
    

    initDB() {
        PouchDB.plugin(cordovaSqlitePlugin);
        this._db0 = new PouchDB('BillChill.db');
        
    }

add(data) {  
    return this._db0.post(data);
}   

update(data) {  
    return this._db0.put(data);
}

delete(data) {  
    return this._db0.remove(data);
}

getAll() {  

    if (!this._Groups) {
        return this._db0.allDocs({ include_docs: true})
            .then(docs => {

                // Each row has a .doc object and we just want to send an 
                // array of birthday objects back to the calling controller,
                // so let's map the array to contain just the .doc objects.

                this._Groups = docs.rows.map(row => {
                    // Dates are not automatically converted from a string.
                    row.doc.Date = new Date(row.doc.Date);
                    return row.doc;
                });

                // Listen for changes on the database.
                this._db0.changes({ live: true, since: 'now', include_docs: true})
                    .on('change', this.onDatabaseChange);

                 return this._Groups;
            });
    } else {
        // Return cached data as a promise
        return Promise.resolve(this._Groups);
    }
}

private onDatabaseChange = (change) => {  
    var index = this.findIndex(this._Groups, change.id);
    var Groups = this._Groups[index];

    if (change.deleted) {
        if (Groups) {
            this._Groups.splice(index, 1); // delete
        }
    } else {
        change.doc.Date = new Date(change.doc.Date);
        if (Groups && Groups._id === change.id) {
            this._Groups[index] = change.doc; // update
        } else {
            this._Groups.splice(index, 0, change.doc) // insert
        }
    }
}

// Binary search, the array is by default sorted by _id.
private findIndex(array, id) {  
    var low = 0, high = array.length, mid;
    while (low < high) {
    mid = (low + high) >>> 1;
    array[mid]._id < id ? low = mid + 1 : high = mid;
    }
    return low;
}


}