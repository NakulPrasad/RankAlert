const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('Hello, World!');
});

// Connecting frontend
// Serve static files from the React app in production
if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(path.resolve(), './client/build')));
    app.get('*', function (req, res) {
        res.sendFile(path.join(path.resolve(), "./client/build/index.html"), function (err) {
            res.status(500).send(err);
        })
    });
}

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
