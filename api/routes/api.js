import express from "express";

const router = express.Router();

router.get('/user/:id', (req, res) => {
    try {
        if (process.env.NODE_ENV !== 'DEV' && !req.isAuthenticated()) {
            return res.status(401).send('Unauthorized');
        }
        const id = req.params.id;
        const db = req.app.locals.db
        db.read();
        const users = db.data.users;
        const user = users.find(user => user._id === id)
        delete user.password
        delete user.eyeColor
        delete user.guid
        delete user._id
        return res.status(200).json(user);
    } catch (error) {
        res.status(500).send("something were wrong")
    }

});

router.put('/user/:id', async (req, res) => {
    try {
        if (process.env.NODE_ENV !== 'DEV' && !req.isAuthenticated()) {
            return res.status(401).send('Unauthorized');
        }
        const id = req.params.id;
        const db = req.app.locals.db
        const users = db.data.users
        let resp
        const udt = users.map(user => {
            if (user._id === id) {
                user = { ...user, ...req.body }
                return resp = user
            }
            return user
        })

        db.data = { users: udt }
        db.write()
         
        return res.status(200).json(resp);
    } catch (error) {
        res.status(500).send("something were wrong")
    }
});

export default router;