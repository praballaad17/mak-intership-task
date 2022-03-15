const express = require("express");

const app = express();
require("./startups/cors")(app);
app.use(express.json({ limit: '50mb' }));
const { mongofunction } = require("./startups/mongodb");
const User = require("./userModal");
mongofunction(app);

app.get("/api/get-users", async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).send(users);
    } catch (error) {
        console.log(error);
        res.status(500).send("error while getting user.")
    }
})

app.post("/api/add-user", async (req, res) => {
    const { name, email, dob, address, username, phone } = req.body.user
    try {
        const user = User({
            name,
            email,
            dob,
            address,
            username,
            phone
        });
        await user.save();
        res.status(200).send(user);
    } catch (error) {
        console.log(error);
        res.status(500).send("error while adding user.")
    }
});

app.delete("/api/delete-user/:userId", async (req, res) => {
    console.log(req.params.userId);
    try {
        await User.findOneAndDelete({ _id: req.params.userId });
        res.status(200).send("document deleted")
    } catch (error) {
        console.log(error);
        res.status(500).send("connot delete the document");
    }
});

app.post("/api/edit-user/:userId", async (req, res) => {
    const { name, email, dob, address, username, phone } = req.body.user

    try {
        const user = await User.findByIdAndUpdate(req.params.userId, {
            name,
            email,
            dob,
            address,
            username,
            phone
        }, { new: true })
        console.log(user);
        res.status(200).send({ msg: "done", user })
    } catch (error) {
        console.log(error);
        res.status(500).send("error while editing user.")
    }

});


const port = process.env.PORT || 3003;
app.listen(port, () => console.log(`Listening on port ${port}...`));