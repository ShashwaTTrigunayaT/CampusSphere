const { showAllEvents, showEvent } = require("../service/allEventsFetcher");
const express=require("express");

const router=express.Router();
router.get("/:type",showAllEvents);
//router.get("#/:id",showEvent);

module.exports=router;