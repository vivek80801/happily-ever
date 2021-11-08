import { app } from "./src/app";

const port = process.env.PORT ?? 5000;

app.listen(port, () =>
  console.log(
    `\x1b[1;44;38m server is running on http://localhost:${port} \x1b[0m`
  )
);
