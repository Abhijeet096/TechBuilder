import { Router } from 'express';
import { list, get, create, update, remove } from '../controllers/sitesController.js';

const router = Router();

router.get('/', list);
router.get('/:id', get);
router.post('/', create);
router.patch('/:id', update);
router.delete('/:id', remove);

export default router;
