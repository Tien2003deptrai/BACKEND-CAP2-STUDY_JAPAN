const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;


db.resource = require("./resource.model");
db.role = require("./role.model");
db.user = require("./user.model");
db.key = require("./keytoken.model");
db.course = require("./course.model");
db.lesson = require("./lesson.model");
db.vocabulary = require("./vocabulary.model");
db.grammar = require("./grammar.model");
db.kanji = require("./kanji.model");
db.deck = require("./deck.model");
db.flashcard = require("./flashcard.model");
db.exams = require("./exams.model");
db.progression = require("./progression.model");
db.notification = require("./notification.model");
db.otp = require("./otp.model");

module.exports = db;
