import { Component, EventEmitter, Injectable, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Reportes } from '../_model/reportes';
import { Gestion } from '../_model/gestion';
import { environment } from './../../environments/environment';
import { Observable,Subject } from 'rxjs';
import { CityI} from '../_model/cityI'
import { Parametros } from '../_model/parametros'
//descargar a excel
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import { dateInputsHaveChanged } from '@angular/material/datepicker/datepicker-input-base';
const EXCEL_TYPE =
'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet; charset=UTF-8';
const EXCEL_EXT = '.xlsx';


@Injectable({
  providedIn: 'root'
})



export class ReporteService {
  
  private url:string = `${environment.HOST}`;

  constructor(private http: HttpClient) { }



  //REPORTES CONTACT

  reporCalificacionServicio(parametros: Parametros):Observable<any>{
      
    const headers = { 'content-type': 'application/json'}  
    const body=JSON.stringify(parametros);
    return this.http.post<Parametros>(`${this.url}/calificacionServicio`,body,{'headers':headers});
   }





  reporTmoEntranteSaliente(parametros: Parametros):Observable<any>{
      
    const headers = { 'content-type': 'application/json'}  
    const body=JSON.stringify(parametros);
    return this.http.post<Parametros>(`${this.url}/tmoEntranteSaliente`,body,{'headers':headers});
   }

  reporTmoSaliente(parametros: Parametros):Observable<any>{
      
    const headers = { 'content-type': 'application/json'}  
    const body=JSON.stringify(parametros);
    return this.http.post<Parametros>(`${this.url}/tmoSaliente`,body,{'headers':headers});
   }

  reporLlamadasRecibidas(parametros: Parametros):Observable<any>{
      
    const headers = { 'content-type': 'application/json'}  
    const body=JSON.stringify(parametros);
    return this.http.post<Parametros>(`${this.url}/llamadasRecibidas`,body,{'headers':headers});
   }


  reporSecretariaVirtual(parametros: Parametros):Observable<any>{
      
    const headers = { 'content-type': 'application/json'}  
    const body=JSON.stringify(parametros);
    return this.http.post<Parametros>(`${this.url}/SecretariaVirtual`,body,{'headers':headers});
   }

   reporTmoDetallado(parametros: Parametros):Observable<any>{
      
    const headers = { 'content-type': 'application/json'}  
    const body=JSON.stringify(parametros);
    return this.http.post<Parametros>(`${this.url}/tmodetallado`,body,{'headers':headers});
   }
 
    reporTmo(parametros: Parametros):Observable<any>{
      
    const headers = { 'content-type': 'application/json'}  
    const body=JSON.stringify(parametros);
    return this.http.post<Parametros>(`${this.url}/tmo`,body,{'headers':headers});
   }

 
    listar(){
      return this.http.get<Reportes[]>(`${this.url}/reportes`);
    }

    listarId(id: number){
      return this.http.get<Reportes>(`${this.url}/reportes/${id}`);

    }
  
    listarGestion(){
      return this.http.get<Gestion[]>(`${this.url}/gestion`);
    }

    listarGestionxfecha(cities: CityI):Observable<any>{
      const headers = { 'content-type': 'application/json'}  
      const body=JSON.stringify(cities);
      console.log("Hola Body"+body)
      return this.http.post<CityI>(`${this.url}/gestion`,body,{'headers':headers});
      
    }

    reporDetalleGestiones(parametros: Parametros):Observable<any>{
      
      const headers = { 'content-type': 'application/json'}  
      const body=JSON.stringify(parametros);
      console.log("Hola Body"+body)
      return this.http.post<CityI>(`${this.url}/detallegestiones`,body,{'headers':headers});

    }

    //USUARIO
    usuariosXEmpresa(parametros: Parametros):Observable<any>{
      
      const headers = { 'content-type': 'application/json'}  
      const body=JSON.stringify(parametros);
      console.log("Hola Body"+body)
      return this.http.post<Parametros>(`${this.url}/usuarios`,body,{'headers':headers});

    }


   


    //EXPORTAR A EXCEL

    exportar(json: any[], excelFileName:string): void{
      const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
      const workbook :  XLSX.WorkBook = {
        Sheets:{'data': worksheet},
        SheetNames: ['data']
    };
    const excelBuffer: any = XLSX.write(workbook, {bookType: 'xlsx', type:'array'});
    this.saveExcel(excelBuffer, excelFileName)
  }
  
  private saveExcel(buffer:any, fileName:string): void {
    const data: Blob = new Blob([buffer], {type: EXCEL_TYPE});
    FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXT);
  }


}
