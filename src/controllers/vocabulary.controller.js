const handleRequest = require("./BaseController");
const { validateRequiredFields } = require("../validators");
const VocabularyService = require("../services/vocabulary.service");

const VocabularyController = {

  createLesson: (req, res) =>
    handleRequest(res, () => {
      return VocabularyService.addVocabulary(req.body);
    }, "Tạo bài học thành công"),

};

module.exports = VocabularyController;
