-- データベースの作成
CREATE DATABASE IF NOT EXISTS mycloset01 CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE mycloset01e;

-- clothes テーブル
CREATE TABLE clothes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    image_url VARCHAR(255) NOT NULL,
    type VARCHAR(50) NOT NULL,
    color VARCHAR(20) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- images テーブル
CREATE TABLE images (
    id INT AUTO_INCREMENT PRIMARY KEY,
    filename VARCHAR(255) NOT NULL,
    size INT,
    last_modified DATETIME,
    content_type VARCHAR(100)
) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- image_tags テーブル
CREATE TABLE image_tags (
    id INT AUTO_INCREMENT PRIMARY KEY,
    file_key VARCHAR(255) NOT NULL,
    tag_key VARCHAR(100) NOT NULL,
    tag_value VARCHAR(255) NOT NULL
) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- インデックスの作成
CREATE INDEX idx_clothes_type ON clothes (type);
CREATE INDEX idx_clothes_color ON clothes (color);
CREATE INDEX idx_image_tags_file_key ON image_tags (file_key);