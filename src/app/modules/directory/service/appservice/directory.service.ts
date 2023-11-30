import { Injectable  } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from "src/environments/environment.prod"
import { HttpClient , HttpParams , HttpHeaders , HttpResponse} from '@angular/common/http'
import { DirectoryI} from 'src/app/modules/directory/service/interface/directory.interface'
import { ResponseDirectory} from 'src/app/modules/directory/service/interface/directoryResponse.interface'


@Injectable({
    providedIn: 'root'
})

export class DirectoryService 
{

    UrlDirectory:string =   environment.UrlDirectory;

    constructor(private http:HttpClient,private para:HttpParams)  
    {
    }
    

    ListadoDirectory(form:DirectoryI):Observable<ResponseDirectory[]> 
    {
     let direccion = this.UrlDirectory + "directory/listardirectory" 
     return this.http.post<ResponseDirectory[]>(direccion,form)
    }


}