import {Router} from 'express';
import {createPhoto, getPhotos, getPhoto, deletePhoto, updatePhoto} from '../controllers/photo.controller';
import multer from '../libs/multer';

const router = Router();

router.route('/photos')
    .post(multer.single('image'),createPhoto)
    .get(getPhotos);
router.route('/photos/:id')
    .get(getPhoto)
    .put(updatePhoto)
    .delete(deletePhoto);

export default router;