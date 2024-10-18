const EventEmitter = require('events');
const fs = require('fs');

class FileProcessor extends EventEmitter {

    readFileAndProcess(filePath) {
        console.log(`Reading file: ${filePath}`);

    fs.readFile(filePath,'utf8',(err,data) => {
        if(err) {
            this.emit('error',err);
            return;
        }

        this.emit('fileRead',data);
        this.processData(data);
    });
    }


processData(data) {
    console.log(`Processing data....`);
    const processData = data.toUpperCase();
    this.emit('dataProcessed',processData);
}    
}

const fileProcessor = new FileProcessor();

fileProcessor.on('fileRead',(data) => {
    console.log(`File successfully read. here is the content:`);
    console.log(data);
});

fileProcessor.on('dataProcessed',(data) => {
    console.log('Data has been processed');
    console.log(data);
});

fileProcessor.on('error',(err) => {
    console.log(`An error occurred: ${err.message}`);
});

fileProcessor.readFileAndProcess('./sample.txt');