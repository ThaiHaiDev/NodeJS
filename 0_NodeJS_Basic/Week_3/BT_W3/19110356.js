// Nguyễn Thái Hải - 19110356 - Nhóm 22

const http = require('http');
const PORT = 5000;

const server = http.createServer();

const teamGroup22 = [
    {id:"19110356",name:'Nguyen Thai Hai'},
    {id:"19110462", name: 'Hoang Minh Thang'},
    {id:"19110364", name: 'Nguyen Huu Hieu'}
];

const mygroup = [
    {id:"19110356",name:'Nguyen Thai Hai'}
]

server.on('request', (req, res) => {
    // req.url = /friend/0 => split('/') = ['', friend, '0']
    const items = req.url.split('/')
    switch(items[1]) {
        case '': 
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(mygroup))
            break;
        case '19110356':
            if (req.method == 'POST') {
                req.on('data', (data) => {
                    const newFriend = data.toString();
                    if (items[2].toString() !== JSON.parse(newFriend).id.toString()) {
                        res.statusCode = 404;
                        res.end('Not valid'); 
                    } else {
                        if (mygroup.filter(e => e.id === JSON.parse(newFriend).id).length > 0) {
                            res.statusCode = 404;
                            res.end('Not valid'); 
                        } else {
                            if (teamGroup22.filter(e => e.id === JSON.parse(newFriend).id).length > 0) {
                                mygroup.push(JSON.parse(newFriend));
                                res.end(JSON.stringify(mygroup))
                            } else {
                                res.statusCode = 404;
                                res.end('Not valid'); 
                            }
                        }
                    }
                    
                })
            } else {
                const student = mygroup.filter(value => value.id === items[2])
                if (mygroup.filter(e => e.id === items[2]).length === 0) {
                    res.statusCode = 404;
                    res.end('Not valid'); 
                } else {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    if (items.length < 3) {
                        res.statusCode = 404;
                        res.end('Not valid'); 
                    } else {
                        res.end(JSON.stringify(student[0]));
                    }
                }
            }
            break;
        case 'message':
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/html');
            if (items.length < 3) {
                res.end(JSON.stringify(mygroup))
            } else {
                if (items[2] === '') {
                    res.end(JSON.stringify(mygroup))
                } else {
                    const student = mygroup.filter(value => value.id === items[2])
                    if(student.length !== 0) {
                        res.write(`<html><body><ul><li>${student[0].name}</li></ul></body></html>`)
                    } else {
                        res.write(`<html><body>Not valid</body></html>`)
                    }
                }
            }
            res.end();
            break;
        default:
            res.statusCode = 404;
            res.end(); 
    }
});

server.listen(PORT, () => {
    console.log(`Server is listening at ${PORT}`);
})

// fetch('http://localhost:5000/friend', {method: 'POST', body: JSON.stringify({id: 3, name: 'Test'})})