import { Injectable } from '@angular/core';  
import * as PouchDB from 'pouchdb';  
import cordovaSqlitePlugin from 'pouchdb-adapter-cordova-sqlite';

@Injectable()
export class DBService {  
    private _db;
    private _Groups;

    initDB() {
        PouchDB.plugin(cordovaSqlitePlugin);
        this._db = new PouchDB('BillChill.db', { adapter: 'cordova-sqlite' });
    }

add(data) {  
    return this._db.post(data);
}   

update(data) {  
    return this._db.put(data);
}

delete(data) {  
    return this._db.remove(data);
}

getAll() {  

    if (!this._Groups) {
        return this._db.allDocs({ include_docs: true})
            .then(docs => {

                // Each row has a .doc object and we just want to send an 
                // array of birthday objects back to the calling controller,
                // so let's map the array to contain just the .doc objects.

                this._Groups = docs.rows.map(row => {
                    // Dates are not automatically converted from a string.
                    row.doc.Date = new Date(row.doc.Date);
                    return row.doc;
                });

                 return this._Groups;
            });
    } else {
        // Return cached data as a promise
        return Promise.resolve(this._Groups);
    }
}


}