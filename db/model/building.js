/**
 * Building
 * 
 * 建筑 
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var BuildingSchema = new mongoose.Schema({
    id: String,          //唯一标识(Unique)
    name: String,        //名称(Unique)
    img: String,         //建筑图
});

module.exports = mongoose.model('Building',BuildingSchema,'building');