



import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";

const router = express.Router();
const __dirname = path.resolve();
const projectRoot = path.join(__dirname, '..');
const uploadDir = path.join(projectRoot, 'uploads');

// Ensure uploads folder exists
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
  console.log('Created upload directory:', uploadDir);
}

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, uploadDir);
  },
  filename(req, file, cb) {
    cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
  }
});

// FIXED FUNCTION NAME: checkFileTypes (singular "Type")
function checkFileTypes(file, cb) {
  const filetypes = /jpeg|jpg|png/;
  
  // FIXED PARENTHESES: Removed extra closing parenthesis
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  
  // Check both extension and mimetype
  const mimetype = filetypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb('Only images are allowed (jpeg, jpg, png)');
  }
}

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  fileFilter: function(req, file, cb) {
    // FIXED: Use correct function name
    checkFileTypes(file, cb);
  }
});

router.post('/', (req, res) => {
  upload.single('image')(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      return res.status(413).json({ error: 'File too large (max 10MB)' });
    } else if (err) {
      return res.status(400).json({ error: err });
    }
    
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }
    
    // Verify file exists
    const filePath = path.join(uploadDir, req.file.filename);
    if (!fs.existsSync(filePath)) {
      console.error('File not saved:', filePath);
      return res.status(500).json({ error: 'File save failed' });
    }
    
    console.log('File saved to:', filePath);
    res.json({ filename: req.file.filename });
  });
});

export default router;













// import express from "express";
//  import multer from "multer";
// import path from "path";


//  const router = express.Router();




//  const storage=multer.diskStorage({


//  destination(req,file,cb){


//  cb(null, path.resolve('uploads'));


//  },


//  filename(req,file,cb){

//    cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);

//  },






// });





//  function checkfilestypes(file,cb){


// const filetypes=/jpeg|jpg|png/;

//  const extname=filetypes.test(path.extname(file.originalname).toLowerCase())
// const mimetype=filetypes.test(file.mimetype)


// if(extname&& mimetype){

// return cb(null,true)


// }else{

// cb('only images are allowed')



//  }


//  }





//  const upload=multer({storage,fileFilter:function(req,file,cb){


//  checkfilestypes(file,cb);






// }})





// //  router.post('/',upload.single('image'),(req,res)=>{
// //  console.log("i am here b")
// //  res.send(`${req.file.path}`)




// //  })

// router.post('/', upload.single('image'), (req, res) => {
//   if (!req.file) {
//     return res.status(400).send('No file uploaded');
//   }
  
//   // Return relative web path instead of system path
//   res.send(`/uploads/${req.file.filename}`);
// });



// export default router;

