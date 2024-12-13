import express from 'express';
import surveyCtrl from '../controllers/survey.controller.js';
import authCtrl from '../controllers/auth.controller.js';
import isAuthenticated from '../middleware/authMiddleware';

const router = express.Router();

// All survey operations require signin
router.use(authCtrl.requireSignin);

router.route('/')
  .get(surveyCtrl.list)
  .post(surveyCtrl.create);

router.route('/:surveyId')
  .get(surveyCtrl.read)
  .put(surveyCtrl.hasAuthorization, surveyCtrl.update)
  .delete(surveyCtrl.hasAuthorization, surveyCtrl.remove);

router.param('surveyId', surveyCtrl.surveyByID);
router.post('/create', isAuthenticated, surveysController.create);
router.get('/list', isAuthenticated, surveysController.list);

export default router;
