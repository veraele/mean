import app from './app';
import {startConection} from './datebase'

const port = app.get('port');

async function main() {
    startConection();
    await app.listen(port);
    console.log('server on port: ',port);
}

main();