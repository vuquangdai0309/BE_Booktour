import MapDetailModel from "../models/MapDetail";
import Generate from "../middlewares/generate";
import jwt from "jsonwebtoken";
class MapDetailController {
  //[GET]
  async GetAllMapDetail(req, res) {
    try {
      const results = await MapDetailModel.GetAllMapDetail();
      res.status(200).json(results);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Lỗi truy vấn" });
    }
  }
  //[GET]
  async GetOneMapDetail(req, res) {
    try {
      const id = req.params.id;
      const results = await MapDetailModel.GetOneMapDetail(id);
      res.status(200).json({ results: results[0] });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Lỗi truy vấn" });
    }
  }
  //[POST]
  async CreateMapDetail(req, res) {
    try {
      let token = req.cookies[process.env.COOKIE];
      let par = jwt.verify(token, process.env.SECRET);
      const imagePath = req.files["image"].map((item) => {
        return item.path;
      });
      const form = {
        code: Generate.generateRandomString(8),
        user_id: par.id,
        logo: req.files["logo"][0].path,
        image: imagePath.join(","),
        ...req.body,
      };

      await MapDetailModel.CreateMapDetail(form);
      res.status(200).json({ message: "Thêm bản ghi thành công" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Lỗi truy vấn" });
    }
  }
  //[PATCH]
  async UpdateMapDetail(req, res) {
    try {
      const id = req.params.id;
      var imagePath = req.body.image;
      var logoPath = req.body.logo;
      if (req.files["image"]) {
        var image = req.files["image"].map((item) => {
          return item.path;
        });
        imagePath = image.join(",");
      }
      if (req.files["logo"]) {
        logoPath = req.files["logo"][0].path;
      }
      const form = {
        logo: logoPath,
        image: imagePath,
        ...req.body,
      };
      await MapDetailModel.UpdateMapDetail(id, form);
      res.status(200).json({ message: "Chỉnh sửa bản ghi thành công" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Lỗi truy vấn" });
    }
  }
  //[PATCH]
  async RemoveMapDetail(req, res) {
    try {
      const id = req.params.id;
      await MapDetailModel.RemoveMap_Detail(id);
      res.status(200).json({ message: "Xóa bản ghi thành công" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Lỗi truy vấn" });
    }
  }
}
export default new MapDetailController();
