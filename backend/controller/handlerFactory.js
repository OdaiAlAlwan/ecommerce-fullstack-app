const asyncHandler = require("express-async-handler");
const ApiError = require("../utils/ApiError");



exports.deleteOne = (model) =>
  asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const document = await model.findByIdAndDelete(id);
    if (!document) {
      return next(new ApiError(` No document for this id ${id}`, 404));
    }
    // Trigger "remove" event when delete document
    document.remove()
    res.status(200).json({ msg: "The deletion was completed successfully" });
  });

exports.updateOne = (model) =>
  asyncHandler(async (req, res, next) => {
    const document = await model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!document) {
      return next(
        new ApiError(
          ` There was Error or No brand for this id ${req.params.id}`,
          404
        )
      );
    }
  // Trigger "save" event when update document
    document.save()

    res.status(200).json({ data: document });
  });

exports.createOne = (model) =>
  asyncHandler(async (req, res) => {
    const newDocument = await model.create(req.body);
    res.status(201).json({ data: newDocument });
  });

exports.getOneById = (model , pupulateOptian) =>
  asyncHandler(async (req, res, next) => {
    const { id } = req.params;

   //Build Query
    let query =  model.findById(id);
    if (pupulateOptian) {
      query = query.populate(pupulateOptian);
    }

    // 2) Execute query
    const document = await query;

    if (!document) {
      return next(new ApiError(` No document for this id ${id}`, 404));
    }
    res.status(200).json({ data: document });
  });

exports.getAll = (model) =>
  asyncHandler(async (req, res) => {
    let filter = {};
    if (req.filterObj) {
      filter = req.filterObj;
    }

    const documents = await model.find(filter);

    res
      .status(200)
      .json({ results: documents.length, data: documents });
  });
