import express from 'express'
import {all,create,deletedetail,deletedetailall,update,specificdetail,allid,deletedetailarr,updatebyobject,deletedetailarrbyobject} from './controller.js'
const router = express.Router()

router.get('/',all)
router.get('/:id',allid)
router.get('/specific',specificdetail)
router.post('/create',create)
router.delete('/deletedetail',deletedetail)
router.delete('/deletedetailarr/:id',deletedetailarr)
router.delete('/deletedetailarrbyobject/:id',deletedetailarrbyobject)
router.delete('/deletedetailall',deletedetailall)
router.put('/update',update)
router.put('/updatebyobject/:id',updatebyobject)

export default router   