const { Router } = require('express');

const { inicio,
        getReportes,
        postReportes,
        getReportesid, 
        getEstados,
        postUsuariosXempresa,
        getmonitoreo,
        potsMonitoreo,
        //reporte Gestor
        getReportesGestion,
        postReportesGestion,
        postDetalleGestiones,
        postPorcentajeTipificacion,
        //reporte Contact        
        postReporteTmo,
        postReporteTmoDetallado,     
        postReporteTmoSaliente,
        postDevolucionFiltrada,
        postCalificacionServicio,
        postLlamadasRecibidas,
        postTmoEntranteSaliente,
        postSecretariaVirtual
} = require ('../controllers/reportes');

const router = Router();

//reportes genericos
router.get('/', inicio );
router.post('/usuarios', postUsuariosXempresa );
router.get('/estados'  , getEstados );
router.get('/monitoreo' , getmonitoreo );
router.post('/monitoreo', potsMonitoreo );


//reportes Gestor
router.get('/reportes', getReportes );
router.get('/reportes/:id', getReportesid );
router.post('/reportes', postReportes );
router.get('/gestion', getReportesGestion );
router.post('/gestion', postReportesGestion );
router.post('/detallegestiones', postDetalleGestiones );
router.post('/porcentaje', postPorcentajeTipificacion );

//reportes Contact
router.post('/tmo'         , postReporteTmo );
router.post('/tmodetallado', postReporteTmoDetallado );
router.post('/tmoSaliente' , postReporteTmoSaliente );
router.post('/devolucionfiltrada', postDevolucionFiltrada );
router.post('/calificacionServicio', postCalificacionServicio );
router.post('/llamadasRecibidas', postLlamadasRecibidas );
router.post('/tmoEntranteSaliente', postTmoEntranteSaliente );
router.post('/SecretariaVirtual', postSecretariaVirtual );






//ejemplo
//router.get('/prueba', (req, res) => {
//    res.send('Hola humdo');
//});




module.exports = router

