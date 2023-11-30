
export interface ListStaffI
{

    descripcion? :null|string; 

  
}


export interface StaffI
{

    idContrata?:null|number;
    idTecnico?:null|number;
    idEntidad?:null|number;
    dsCuadrilla ?:null|string; 
    dsNombre? :null|string; 
    dsPaterno? :null|string;      
    dsMaterno? :null|string;      
    //TpDoc ? :null|string;    
    nuDocId? :null|string;   
    nuSCTR ? :null|string;  
    nuPlaca? : null|string;     
    dsCargo ? :null|string;  
    dtIngreso ? :null|string;  
    dtFin ? :null|string;  
    idArea ? :null|number;  
    // idEstado ? :null|Int32Array;  
    dsComentario ? :null|string;  
    fgCapacita ? :null|boolean;  
    dsNotaCapacita ? :null|string;  
    Telefono  ? :null|string;   
    dsObservacion  ? :null|string;   
    idEntidadObs?:null|number;

    codigo? :null|number;
    nombre? :null|string;
    apepaterno? :null|string; 
    apematerno? :null|string;
    dni? :null|string;
    celular? :null|string; 
    fechaingreso? :null|Date;
    fechacese? :null|Date;
    comentarios? :null|string;
    idestado? :null|number;
    idcontrata? :null|number;
    razon_social? :null|string;

}


export interface ObsI
{

    id_obs?:null|number;
    codigo?:null|number;
    observacion ?:null|string; 


}

