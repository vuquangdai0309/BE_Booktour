import express from "express";
import MapDetailController from "../controller.js/MapDetailController";
import { uploadItem } from "../middlewares/upload";
const router = express.Router();

//xóa
router.delete("/:id/remove-map-detail", MapDetailController.RemoveMapDetail);
//chỉnh sửa
router.patch(
  "/:id/update-map-detail",
  uploadItem.fields([{ name: "image" }, { name: "logo" }]),
  MapDetailController.UpdateMapDetail
);
//tạo mới
router.post(
  "/create-map-detail",
  uploadItem.fields([{ name: "image" }, { name: "logo" }]),
  MapDetailController.CreateMapDetail
);
// lấy 1
router.get("/:id/get-one-map-detail", MapDetailController.GetOneMapDetail);
// lấy tất cả
router.get("/get-all-map-detail", MapDetailController.GetAllMapDetail);

export default router;