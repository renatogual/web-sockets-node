import express from 'express';

const app = express();

app.get('/', (req, res) => {
    return res.json({ message: 'Hellow' })
})

app.listen(3000, () => console.log('rodando'))