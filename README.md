# Bài Test Frontend Geek Up

## Hình ảnh kết quả

- Giao diện Albums
  ![Alt text](./images/Giao%20diện%20Albums.png)
- Giao diện Album Details
  ![Alt text](./images/Giao%20diện%20Album%20Details.png)
- Giao diện Users
  ![Alt text](./images/Giao%20diện%20Users.png)
- Giao diện User Details
  ![Alt text](./images/Giao%20diện%20User%20Details.png)
- Giao diện xem ảnh Album Details
  ![Alt text](./images/Giao%20diện%20xem%20ảnh%20Album.png)
- Giao diện khi Sidebar collapsed
  ![Alt text](./images/Giao%20diện%20khi%20Sidebar%20Collapsed.png)

## Yêu cầu

- Node.js (>= 16.x)
- Yarn (>= 1.22.x)

## Cài đặt

1. Clone repository: git clone https://github.com/giacuong333/geekup-test.git
2. cd geek-test
3. Cài đặt dependencies: yarn install
4. Khởi động server phát triển: yarn dev
5. Mở http://localhost:5173 trên trình duyệt.

## Sử dụng

- Phát triển: Chạy yarn dev để bật hot-reload.
- Build: Chạy yarn build để tạo bản production.
- Xem trước: Chạy yarn preview để kiểm tra bản production cục bộ.

## Công nghệ

- Vite: Công cụ build nhanh và server phát triển.
- ReactJS: Thư viện giao diện người dùng.
- TailwindCSS: Framework CSS tiện ích.
- AntDesign: Thư viện component giao diện.
- Yarn: Quản lý gói.

## Cấu trúc dự án

src/: Mã nguồn.
components/: Component React tái sử dụng.
layout/: Layout admin.
contexts/: Chứa các phương thức dùng lại nhiều lần.
apis/: Chứa các apis
paths/: Chứa các path
routes: Định nghĩa route tương ứng với layout đúng với path
styles/: TailwindCSS và style tùy chỉnh.
public/: Tài nguyên tĩnh.

Ảnh minh họa cấu trúc dự án:
![Alt text](/images/Cấu%20trúc%20của%20Project.png)
