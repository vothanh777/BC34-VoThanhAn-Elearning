import React from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { removeCourse } from "../../Redux/Reducers/userReducer";
import { removeRegisteredCourseApi } from "../../Services/course";
import { getLocal } from "../../Ultis/config";

export default function CoursesListing(props) {
  const dispatch = useDispatch();
  const { courseList, isCancel } = props;
  let userCredentials = null;
  if (isCancel) {
    userCredentials = getLocal("userCredentials");
  }
  return (
    <div className="row">
      {courseList.map((course, index) => {
        return (
          <div
            className="col-12 py-2"
            key={index}
            style={{
              borderTop: "1px solid black",
              backgroundColor: "#f8f9fa",
            }}
          >
            <div className="row">
              <div className="col-lg-3">
                <img
                  style={{ height: 150 }}
                  src={course.hinhAnh}
                  alt=""
                  className="img-fluid"
                />
              </div>
              <div className="col-lg-9">
                <h1>
                  <NavLink
                    style={{
                      textDecoration: "none",
                      color: "black",
                      cursor: "pointer",
                    }}
                    to={`/coursedetail/${course.maKhoaHoc}`}
                  >
                    {course.tenKhoaHoc}
                  </NavLink>
                </h1>
                <p>{course.moTa}</p>
                <div className="text-right">
                  <p>
                    {course.soLuongHocVien ? course.soLuongHocVien : 0} học viên
                  </p>
                  {isCancel ? (
                    <p className="pr-2">
                      <button
                        className="btn btn-danger"
                        onClick={() => {
                          if (userCredentials) {
                            const registerInfo = {
                              accessToken: userCredentials.accessToken,
                              info: {
                                maKhoaHoc: course.maKhoaHoc,
                                taiKhoan: userCredentials.taiKhoan,
                              },
                            };

                            removeRegisteredCourseApi(registerInfo)
                              .then((res) => {
                                alert(res.data);
                                dispatch(removeCourse(course.maKhoaHoc));
                              })
                              .catch((err) => alert(err.response.data));
                          }
                        }}
                      >
                        Huỷ
                      </button>
                    </p>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
