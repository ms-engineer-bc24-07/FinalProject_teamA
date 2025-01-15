# FinalProject_teamA

## チーム名
リスプラ～ず


# 概要

## アプリケーション名
Dayzzy

## 目的
日々の服選びの時間短縮。服装選びを少しでも楽に、楽しく、負担軽減。

## ターゲット
毎日忙しくて（忙しくなくても）服選びが面倒くさいけど外出するのに何を着て行っても良いわけではない人。着回しを考えるのが苦手な人。年齢性別は関係なく。

-----------------------------------------------------
## 機能
### ワードロープ機能(WR)

写真付きで手持ちのファッションアイテムを登録し、管理できる。

### コーディネート機能(CN)

その日の天気などを考慮し、コーディネートを提案してくれる。

### 認証機能(AC)
ユーザーが会員登録できる。

### 決済機能(PAY)
有料機能を使用する際、決済情報を登録する。

-----------------------------------------------------

# 使用技術
#### フロントエンド
- 言語：Typescript
- フレームワーク：Next.js
- ライブラリ：React


#### バックエンド
- 言語：Python
- フレームワーク：Flask


#### データベース
- MySQL
- AWS S3

-------
# GitHub運用ルール
## ブランチ運用ルール
- 原則、mainからブランチを切らない（developから切る）
- 1つの作業に対して１つのブランチを作成する

## ブランチの役割と命名ルール

### メインブランチ
---
main: 本番用。ここにマージする時はリリースできる状態である時。

develop: 開発中（リリース前）の機能。次のリリースのための最新の開発作業の変更が反映されている状態。

### サポートブランチ
---
#### __feature/xxx__
新機能の開発をする際にfeatureブランチを切る。

分岐元： develop  
merge先： develop

#### __bugfix/xxx__
開発中の機能でバグが見つかった時に、bugfixブランチを切る。

分岐元： develop  
merge先： develop

#### __fix/xxx__
開発中の機能で修正箇所があった時に、fixブランチを切る。

分岐元： develop   
merge先： develop

#### __docs/内容__
分岐元：  
merge先：

## 命名ルール
/issue番号/機能名称(イニシャル)

例：feature/5/WR


## コミット運用ルール
- コミットはこまめに行う
- コミットメッセージは文章化せずに簡潔に入力する


## プルリクエストについて
## プルリクエスト運用ルール
- 1修正、１プルリク、１issue番号
- プルリク後、メンバーからのレビューがないままマージしない


## PRテンプレート
```
## 概要
<!-- 何をやったかを簡単に書く -->

## 技術的変更点
### before
（変更前の状態を記載）

### アクション
（変更のための具体的なアクションを記載。なにをどう変更したか、ロジックがどういう手順で動くのか、簡単な説明など）

### As Is
（今の状態を記載。）

## issues
Closes #issue_id

## UIの変更
|変更前|変更後|
|---|---|
|変更前スクショ|変更後のスクショ|
```
## レビューを行う際のルール
- 必ず最低限一人はレビューをしてコメントする。できれば全員行うのが理想。
- レビューは基本的にはプルリク後、1日以上空けないこと。

## レビューする際に確認すべきこと
- コードの可読性
- 必要なテストが書かれているか
- 仕様に合致しているか



## issueについて
#### 目的: 課題や作業を明確にし、チーム全体で共有。プルリクエストと紐づけることでより詳しい内容をチームで共有し、作業の共通認識、透明化を図る。

## issue ラベル一覧
- feature：新規機能追加
- bugfix：不具合対応
- wantfix：修正要望
- refactor：リファクタリングやTODO消化
- pending：一時保留 / バグが再現しないなど
- QA：作業にあたってQA中の項目がある場合

## issueテンプレート
```
## Title
issue番号_機能名称_このissueを通してどのような状態になったか簡潔に記載
例：5_ワードロープ_アイテム編集機能が追加された

## wite
### As Is
（今の状態を記載）

### To Be
（理想の状態を記載。タスク完了の条件にもなる。）

### アクション
（改善のための具体的なアクションを記載）

### 課題
（現状分かっている課題を記載）

## 参考記事など
