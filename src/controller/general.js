const generalModel = require("../model/general");

const empGet = async(req, res) => {

    try {
        const ishcilerGetir = await generalModel.ishciler()

        res.json({
            data : ishcilerGetir,
            status : "success"
        });
    } catch(err) {
        res.json({
            data : err,
            status : "error"
        });
    }

};

const empDelete = async (req, res) => {
    try {

        const ishciSil = await generalModel.sil(req.query.id);

        res.json({
            data : ishciSil,
            status : "success"
        });

    } catch(err) {
        res.json({
            data : err,
            status : "error"
        });
    }
}

const empAdd = async (req, res) => {
    try {

        const {name, position, salary, family_status, email} = req.query;

        // let date_ob = new Date();

        // let date = ("0" + date_ob.getDate()).slice(-2);
        // let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
        // let year = date_ob.getFullYear();
        // let hours = date_ob.getHours();
        // let minutes = date_ob.getMinutes();
        // let seconds = date_ob.getSeconds();

        // const datetime = year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds;

        const isciElave = await generalModel.isciElave(name, position, salary, family_status, email);

        res.json({
            data: isciElave,
            status: "success",
        })
    } catch (err) {
        res.json({
            data: err,
            status: "error"
        });
    }
};

const checkEmail = async(req, res) => {

    try {
        const mail = await generalModel.mailYoxla(req.query.email);

        res.json({
            data : mail ? "Mail istifade edilib" : "Mail istifade edilmeyib",
            status : "success"
        });
    } catch(err) {
        res.json({
            data : err,
            status : "error"
        });
    }

};

const me = async(req, res, next) => {

    try {

        if (req.user) {
            res.json({
                data: req.user,
                status: "success"
            });
        } else {
            res.json({
                data : "Giris Edin",
                status : "error"
            });
        }

        next();

    } catch(err) {
        res.json({
            data : err,
            status : "error"
        });

        next();
    }

};

const empUpdate = async (req, res) => {
    try {

        const {name, position, salary, family_status, id} = req.query;

        const isciYenile = await generalModel.isciUpdate(name, position, salary, family_status, id);

        res.json({
            data : isciYenile,
            status : "success"
        });

    } catch(err) {
        res.json({
            data : err,
            status : "error"
        });
    }
}

const login = async (req, res) => {
    try {

        const {email, password} = req.query;

        const login = await generalModel.login(email, password);

        res.json({
            data : login,
            status : "success"
        });

    } catch(err) {
        res.json({
            data : err,
            status : "error"
        });
    }
}

module.exports = {
    empGet,
    empDelete,
    empAdd,
    checkEmail,
    empUpdate,
    login,
    me
}