let buildInsertQuery = (tableName, jsonObject) => {

    let keys = Object.keys(jsonObject);
    let values = [];
    let placeHolder = [];
    keys.forEach(key => {
      values.push(jsonObject[key]);
      placeHolder.push('?');
    });

    let query = `INSERT INTO ${tableName}(${keys.join(', ')}) VALUES(${placeHolder.join(', ')})`;
    return {
        query: query,
        fields: values
    }
}

module.exports = {
    buildInsertQuery: buildInsertQuery
}