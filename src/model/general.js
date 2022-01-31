const DB = require("../db/connection");
const moment = require("moment");
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');


const sil = (id) => {

    return new Promise( (resolve, reject) => {
        const query = `DELETE FROM employees WHERE id = ?`;
        const filter = [id];

        DB.query(query, filter, async(err, result) => {           
            if (err) {
                reject(err);
                return 0;
            }

            if(result.affectedRows === 0){
                reject('ID Not Found');
                return 0;
            }

            resolve(1);
            return 1;
        });
    });
};

const ishciler = () => {

    return new Promise( (resolve, reject) => {
        const query = `SELECT * FROM employees`;
        const filter = [];

        DB.query(query, filter, async(err, result) => {           
            if (err) {
                reject(err);
                return 0;
            }

            if (result.length === 0 || result == undefined || !result) {
                resolve([]);
                return 0;
            }

            resolve(result);
            return 0;
        });
    });
};

const mailYoxla = (email) => {

    return new Promise( (resolve, reject) => {
        const query = `SELECT * FROM employees where email = ?`;
        const filter = [email];

        DB.query(query, filter, async(err, result) => {           
            if (err) {
                reject(err);
                return 0;
            }

            if (result.length === 0 || result == undefined || !result) {
                resolve(0);
                return 0;
            }

            resolve(result);
            return 1;
        });
    });
};

const refCodeYoxla = (refcode) => {

    return new Promise( (resolve, reject) => {
        const query = `SELECT * FROM employees where ref_code = ?`;
        const filter = [refcode];

        DB.query(query, filter, async(err, result) => {           
            if (err) {
                reject(err);
                return 0;
            }

            if (result.length === 0 || result == undefined || !result) {
                resolve(0);
                return 0;
            }

            resolve(1);
            return 1;
        });
    });
};

const isciElave = (ad_soyad, vezife, maas, av, email) => {

    return new Promise( async(resolve, reject) => {

        const query = `INSERT INTO employees (ref_code, name, position, salary, family_status, email, password, date) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;

        const date = moment().local().format("YYYY-MM-DD HH:MM:SS");
     
        email = email.toLowerCase();
        const check_mail = await mailYoxla(email);
        if (check_mail) {
            reject('Mail var');
            return 0;
        }

        const ref_code = await RefCode();

        const password = generatePassword();
        const passwordHash = await bcrypt.hashSync(password, saltRounds);

        const filter = [ref_code, ad_soyad, vezife, maas, av, email, passwordHash, date];

        DB.query(query, filter, async(err, result) => {           
            if (err) {
                reject(err);
                return 0;
            }

            if (result.affectedRows === 0) {
                reject('Error');
                return 0;
            }

            resolve("Employer added");
            return 1;
        });
    });

};

const isciUpdate = (name, position, salary, family_status, id) => {

    return new Promise( (resolve, reject) => {
        const query = `UPDATE employees SET name=?, position=?, salary=?, family_status=? WHERE id=?`;
        const filter = [name, position, salary, family_status, id];

        DB.query(query, filter, async(err, result) => {           
            if (err) {
                reject(err);
                return 0;
            }

            if(result.affectedRows === 0){
                reject('ID Not Found');
                return 0;
            }

            resolve("Employer is updated");
            return 1;
        });
    });
};

const login = (email, passwordUser) => {

    return new Promise( async(resolve, reject) => {
        email = email.toLowerCase();
        const check_mail = await mailYoxla(email);
        if (!check_mail) {
            reject('Bele istifadeci movcud deyil!');
            return 0;
        }

        const pass = check_mail[0].password;
        
        const passCheck = await bcrypt.compare(passwordUser, pass);

        if (!passCheck) {
            reject('Bele istifadeci movcud deyil!');
            return 0;
        }

       const token = await GenerateToken(check_mail);
       resolve(token);
       return 1;
    }) 
};


const RefCode = async() => {

    const code = generateRefCode();

    const check_code = await refCodeYoxla(code);

    if(check_code){
        return RefCode();
    }

    return code;

};

const generatePassword = () =>{
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%&!@#$%&!@#$%&';
    var charactersLength = characters.length;
    
    for ( var i = 0; i < 8; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
};

const generateRefCode = () =>{
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    var charactersLength = characters.length;

    for ( var i = 0; i < 5; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
};

const GenerateToken = async(user) => {
    
    const token = await jwt.sign({
        id: user[0].id,
        email: user[0].email
    }, 'test123', {});

    return token;

};


module.exports = {
    sil, 
    ishciler,
    isciElave,
    mailYoxla,
    isciUpdate,
    login,
    GenerateToken
}