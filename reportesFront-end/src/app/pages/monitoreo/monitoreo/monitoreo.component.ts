import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import * as moment from 'moment';
import { interval } from 'rxjs';
import { AskEstadoExtension } from 'src/app/_model/askEstadoExtension';
import { MonitoreoService } from '../../../_services/monitoreo.service'



@Component({
  selector: 'app-monitoreo',
  templateUrl: './monitoreo.component.html',
  styleUrls: ['./monitoreo.component.css']
})
export class MonitoreoComponent implements OnInit {
  
  empresaparametro !:  string;
  loading : Boolean;

  displayedColumns = ['serial','extension', 'login', 'fecha', 'descripcion', 'total'];
  dataSource !: MatTableDataSource<AskEstadoExtension>;
  @ViewChild(MatSort) sort!: MatSort;



  constructor( private monitoreoService : MonitoreoService ) {
    this.loading=true;
    
  }

  ngOnInit(): void {
    this.empresaparametro = 'ASISTIDA'

 
    const parametros= {empresa:this.empresaparametro }
   //

    const actualizar = interval(3000)
    actualizar.subscribe(n=>{
      console.log(n,"tatal")
        /*this.monitoreoService.listarMonitoreo().subscribe(data => {
        this.dataSource= new MatTableDataSource(data);
         });*/
         this.monitoreoService.monitoreoEmpresa(parametros).subscribe(data=>{
          this.dataSource= new MatTableDataSource(data);
          this.loading=false;
         });
      })
  }
  filtro(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


}
