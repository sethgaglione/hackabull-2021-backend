import pool from './pool';

function query (queryText: string, params?: any[]) : any{
    return new Promise((resolve, reject) => {
        pool.query(queryText, params)
            .then((res) => {
                resolve(res);
            })
            .catch((error: any) => {
                reject(error);
            })
    });
}

function queryDatabase (queryText: string) : void {
    pool.query(queryText)
        .then(res => {
            console.log(res);
            pool.end;
        })
        .catch(err => {
            console.log(err);
            pool.end();
        });
}

export {
    query,
    queryDatabase
}