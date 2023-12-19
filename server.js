const express = require('express')
const app = express()
const data = require('./data.json')

app.use(express.json()); // Express utilizara o json

// VERBOS HTTP
// ALL
app.get("/clients", function (req, res){
    res.json(data);
});

// SINGLE
app.get("/clients/:id", function(req, res){
    const { id } = req.params;
    const client = data.find(cli => cli.id == id);
    
    if (!client) return res.status(204).json();

    res.json(client);
});

// STORE
app.post("/clients", function (req, res){
    const {name, email} = req.body;

    // Salvou

    res.json({name, email});
});

// UPLOAD
app.put("/clients/:id", function (req, res){
    const { id } = req.params;
    const client = data.find(cli => cli.id == id);

    if(!client) return res.status(404).json();

    const { name } = req.body;
    client.name = name;
    
    res.json(client);
});

// DESTROY
app.delete("/clients/:id", function (req, res){
    const { id } = req.params;
    const clientsFiltered = data.filter(client => client.id != id );

    res.json(clientsFiltered);
});

app.listen(3000, function() {
    console.log('Server is Running!');
})