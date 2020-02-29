const router = require('express').Router();
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const account = require('../controllers/account');
const favorites = require('../controllers/favourites');
const catchErrors = require('../handlers/errorHandlers').catchErrors;

const tempPath = `./uploads/temp/`;

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, tempPath);
  },
  filename: (req, file, cb) => {
    cb(null, `${path.parse(file.originalname).name}-${Date.now()}${path.extname(file.originalname)}`);
  }
});

const upload = multer({ storage: storage });

router.get('/', catchErrors(account.getAccountInfo));
router.get('/edit', catchErrors(account.editInfo));
router.get('/records', catchErrors(account.records));
router.get('/add-record', catchErrors(account.addRecord));
router.post('/upload-record', upload.array("file"), catchErrors(account.uploadRecord));
router.get('/foundations', catchErrors(account.getFoundations));
router.post('/add-foundation', catchErrors(account.addFoundation));
router.get('/balance', catchErrors(account.getBalance));
router.post('/add-balance', catchErrors(account.addBalance));
router.post('/updateAccount', catchErrors(account.updateAccount));
router.get('/success', catchErrors(account.success));
router.get('/favorites', catchErrors(favorites.getFavorites));


module.exports = router;