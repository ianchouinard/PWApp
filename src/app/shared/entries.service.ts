import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers} from '@angular/http';
import { EntryModel } from '../models/entry.model';
import 'rxjs/add/operator/map';

@Injectable()
export class EntriesService {

    constructor (
        private http: Http
    ) {}

    private apiKey = `https://roadm-apped-api.herokuapp.com/map`;

    getEntry(id: string, passKey) {
        let url = `${this.apiKey}/${id}`;
        if (passKey) {
            url += `?passkey=${passKey}`;
        }
        let maps = this.http.get(url);
        return maps;
    }

    postEntry(mapmodel: EntryModel) {
    	let payload = JSON.stringify(mapmodel);
    	let headers = new Headers();
  		headers.append('Content-Type', 'application/json');
    	let post = this.http.post(this.apiKey, payload, {headers: headers});
        return post;
    }

    updateEntry(mapmodel: EntryModel, id: string, passKey) {
        let url = `${this.apiKey}/${id}`;
        let protect = false;
        if (passKey) {
            url += `?passkey=${passKey}`;
            if (passKey.length > 0) {
                protect = true;
            }
        }
        mapmodel.isPassProtected = protect;
        let payload = JSON.stringify(mapmodel);
    	let headers = new Headers();
  		headers.append('Content-Type', 'application/json');
    	let update = this.http.put(url, payload, {headers: headers});
        return update;
    }

    deleteEntry(id: string, passKey) {
        let url = `${this.apiKey}/${id}`;
        if (passKey) {
            url += `?passkey=${passKey}`;
        }
        let maps = this.http.delete(url);
        return maps;
    }

}
