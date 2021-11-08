import express from "express";
import multer from "multer";
import path from "path";

export const app = express();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); //Appending extension
  },
});
const upload = multer({ storage: storage });

app.use(express.static(__dirname.replace("/src", "/public")));

app.get("/", (req, res) => {
  res.json({ msg: "hello from server" });
});

app.post("/api/upload", upload.single("upload"), (req, res) => {
  const { name, dateOfBirth, religion, height } = req.body;
  res.send(`
           <!DOCTYPE html>
           <html>
           <head><title>${name}</title></head>
           <body style="font-family: ubuntu;">
            <h1>Name: ${name}</h1>
            <img src="/uploads/${req.file && req.file.filename}" alt="${name}"/>
            <p>
            date of birth: ${dateOfBirth},</br>
            religion: ${religion},</br>
            height: ${height},</br>
            </p>
            <a style="background-color: #00f; color:#fff; text-transform: capitalize; padding: 1rem; border-radius: 0.75rem;" href="http://localhost:3000/">log out</a>
           </body>
           </html>
           `);
});

app.use((req, res) => {
  res.json({ msg: "page not found" });
});

app.use(
  (
    err: Error,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    if (err) {
      res.json({ msg: err });
    } else {
      next();
    }
  }
);
