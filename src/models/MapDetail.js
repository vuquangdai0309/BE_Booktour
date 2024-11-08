import connection from "../config/db";
const MapDetailModel = {
  // lấy các bài viết
  GetAllMapDetail: () => {
    return new Promise((resolve, reject) => {
      const query = `SELECT map_detail.*,
        map.name AS name_map,
        map.coordinates AS coordinates
        FROM map_detail
        JOIN map ON map_detail.map_id = map.id
        WHERE map_detail.is_deleted = 0
        `;
      connection.query(query, (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  },
  // Lấy map chi tiết theo map
  GetMapDetailByMapId: (map_id) => {
    return new Promise((resolve, reject) => {
      const query = `SELECT map_detail.*,
        map.name AS name_map,
        map.coordinates AS coordinates
        FROM map_detail
        JOIN map ON map_detail.map_id = map.id
        WHERE map_detail.is_deleted = 0 AND map_detail.map_id=${map_id}
        `;
      connection.query(query, (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results?.[0]);
        }
      });
    });
  },
  // lấy 1 bài viết
  GetOneMapDetail: (id) => {
    return new Promise((resolve, reject) => {
      const query = `SELECT map_detail.*,
        map.name AS name_map,
        map.coordinates AS coordinates
        FROM map_detail
        JOIN map ON map_detail.map_id = map.id
        WHERE map_detail.is_deleted = 0 AND map_detail.id = ?
        `;
      connection.query(query, id, (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  },
  // tạo mới
  CreateMapDetail: (item) => {
    return new Promise((resolve, reject) => {
      const query = `INSERT INTO map_detail(user_id,map_id,title,logo,image,address,content,open_hour)
      VALUES (?,?,?,?,?,?,?,?)
        `;
      const values = [
        item.user_id,
        item.map_id,
        item.title,
        item.logo,
        item.image,
        item.address,
        item.content,
        item.open_hour,
      ];
      connection.query(query, values, (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  },
  // chỉnh sửa
  UpdateMapDetail: (id, item) => {
    return new Promise((resolve, reject) => {
      const query = `UPDATE map_detail SET title = ?,logo = ?,image = ?,address = ?,content = ?,open_hour = ? WHERE map_id = ${id}`;
      const values = [
        item.title,
        item.logo,
        item.image,
        item.address,
        item.content,
        item.open_hour,
      ];
      connection.query(query, values, (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  },
  // xóa
  RemoveMap_Detail: (id) => {
    return new Promise((resolve, reject) => {
      const query = `UPDATE map_detail SET is_deleted = 1 WHERE id = ?`;
      connection.query(query, id, (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  },
};
export default MapDetailModel;
