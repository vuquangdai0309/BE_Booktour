import express from "express";
import BookingController from "../controller.js/BookingController";
const router = express.Router();
// xóa bỏ
router.delete("/:id/remove-booking", BookingController.RemoveBooking);
// chỉnh sửa
router.patch("/:id/update-booking", BookingController.UpdateBooking);
// tạo mới
router.post("/create-booking", BookingController.CreateBooking);
// lấy 1
router.get("/:id/get-one-booking", BookingController.GetOneBooking);
// lấy tất cả
router.get("/get-all-booking", BookingController.GetAllBooking);

export default router;
