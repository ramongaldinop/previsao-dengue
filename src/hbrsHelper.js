const moment = require('../node_modules/moment')
const Handlebars = require('handlebars')

Handlebars.registerHelper('formatTime', function (date, format) {
    var mmnt = moment(date);
    mmnt.locale('pt-br')
    return mmnt.format(format);
});
