import { HttpClient, HttpContext, HttpEvent, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

type GET_PARAMS = Record<string, string | number | boolean | readonly (string | number | boolean)[]>;

@Injectable({
    providedIn: 'root'
})
export class RestService {
    private _restOptionsDefault: RestOptions = {};

    constructor(
        private _http: HttpClient,
    ) {
    }

    public restGET<T = any>(endpoint: string, params: GET_PARAMS = {}, options?: Omit<RestOptions, 'body'>): Observable<T> {
        return this.request('GET', endpoint, {
            ...options,
            params: new HttpParams({
                fromObject: params
            })
        });
    }

    public restGETText<T = any>(endpoint: string, options?: Omit<RestOptions, 'body'>): Observable<T> {
        return this.request('GET', endpoint, {
            ...options,
            responseType: 'text',
        });
    }

    public restPOST<T = any>(endpoint: string, body: object | null = null, options?: Omit<RestOptions, 'body'>): Observable<T> {
        return this.request('POST', endpoint, {
            ...options,
            body
        });
    }

    public restPOSTFormData<T = any>(endpoint: string, body: object | null = null, options?: Omit<RestOptions, 'body'>): Observable<T> {
        const formData: FormData = new FormData();
        this._convertObjectToFormData(body, formData);

        return this.request('POST', endpoint, {
            ...options,
            body: formData
        });
    }

    public restPOSTBlob(endpoint: string, body: object | null = null, options?: Omit<RestOptions, 'body'>): Observable<HttpEvent<Blob>> {
        return this.request('POST', endpoint, {
            ...options,
            body,
            responseType: 'blob',
            observe: 'response',
        });
    }

    public restPUT<T = any>(endpoint: string, body: object | null = null, options?: Omit<RestOptions, 'body'>): Observable<T> {
        return this.request('PUT', endpoint, {
            ...options,
            body
        });
    }

    public restDELETE<T = any>(endpoint: string, body: object | null = null, options?: Omit<RestOptions, 'body'>): Observable<T> {
        return this.request('DELETE', endpoint, {
            ...options,
            body
        });
    }

    public request<T>(method: string, endpoint: string, options: RestOptions = this._restOptionsDefault): Observable<T> {
        const preparedOptions = this._prepareRestOptions(options);

        const context = new HttpContext();

        const httpOptions: HttpOptions = {
            ...preparedOptions,
            context,
        };

        return this._http.request(method, `${environment.apiBaseUrl}/${endpoint}`, httpOptions);
    }

    private _convertObjectToFormData(
        object: any,
        formData: FormData,
        formObject: any = null,
        property = ''
    ) {
        const isObj = (obj: any, fData: any, prop: string) => {
            if (typeof obj === 'object') {
                if (!!obj && obj.constructor === Array) {
                    prop += '[]';
                    for (let i = 0; i < obj.length; i++) {
                        const auxFob = fData
                            ? fData[i]
                            : fData;
                        isObj(obj[i], auxFob, prop);
                    }
                } else if (!!obj && obj.constructor === File) {
                    formData.append(prop, obj, obj.name);
                } else {
                    this._convertObjectToFormData(obj, formData, fData, prop);
                }
            } else {
                const value = fData
                    ? fData
                    : obj;
                formData.append(prop, value);
            }
        };
        isObj.bind(this);

        for (const prop in object) {
            if (object.hasOwnProperty(prop)) {
                const auxP = property === ''
                    ? prop
                    : `${property}[${prop}]`;
                const auxFob = formObject
                    ? formObject[prop]
                    : formObject;
                isObj(object[prop], auxFob, auxP);
            }
        }
    }

    private _prepareRestOptions(options: RestOptions = this._restOptionsDefault): RestOptions {
        return {
            ...options,
        };
    }
}

export type RestOptions = HttpOptions;

interface HttpOptions {
    body?: any;
    headers?: HttpHeaders | Record<string, string | string[]>;
    context?: HttpContext;
    observe?: 'body' | 'response' | 'events';
    params?: HttpParams | Record<string, string | number | boolean | readonly (string | number | boolean)[]>;
    responseType?: 'json' | 'blob' | 'text';
    reportProgress?: boolean;
    withCredentials?: boolean;
}
