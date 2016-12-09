/**
 * 基类,封装数据库基本操作  
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var util = require('util');

var BaseSchema = function(schema) {
    BaseSchema.super_.apply(this, [schema], this.constructor);

    /**
     * query
     * 默认采用_id作为标识
     */
    this.statics.getQuery = function(param) {
        return { _id: param };
    }

    /**
     * relative 
     * 
     * the reference table
     */
    this.statics.relative = function() {
        return '';
    }

    /**
     * add collection
     */
    this.statics.add = function(doc, cb) {
        cb = cb || function() {};
        this.create(doc, cb);
    }

    /**
     * modify collection
     */
    this.statics.modify = function(param, doc, cb) {
        cb = cb || function() {};
        // this.update(this.getQuery(param), doc, null, cb);
        this.update(this.getQuery(param), doc).exec(cb);
    }

    /**
     * findItem  get/obtain
     */
    this.statics.findItem = function(param, cb) {
        cb = cb || function() {};
        // this.findOne(this.getQuery(param), cb);
        this.findOne(this.getQuery(param)).populate(this.relative()).exec(cb);
    }

    /**
     * remove item
     */
    this.statics.removeItem = function(param, cb) {
        this.remove(this.getQuery(param), cb);
    }

    /**
     * find all
     */
    this.statics.findAll = function(cb) {
        cb = cb || function() {};
        this.find({}).populate(this.relative()).exec(cb);
    }

    /**
     * remove all
     */
    this.statics.removeAll = function(cb) {
        cb = cb || function() {};
        this.remove({}, cb);
    }
}

util.inherits(BaseSchema, Schema);

module.exports = BaseSchema;