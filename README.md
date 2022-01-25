# LIVESHARE

ライブ情報に特化した SNS のフロントエンドです。

## Prerequisites

- Node.js 14.17.0
- Vue.js 4.5.13

## Usage Guide

[ご利用者様向けガイドはこちらから](/USAGEGUIDE.md)

## Installing

### Node.js

#### Mac

Node.js のインストールは[こちら](https://nodejs.org/ja/download/)

「MacOS Installer」を選択するとダウンロード開始します。

インストーラーが立ち上がるので全て「続ける」をクリックし、「インストール」をクリックします。

インストール完了後に「閉じる」をクリックします。

ターミナルを開き、下記コマンドを入力します。

```
$ node -v
```

バージョンが返ってくれば成功です。

#### Windows

Node.js のインストールは[こちら](https://nodejs.org/ja/download/)

インストーラーが立ちあがるので Next をクリックします。

End-User License Agreement - 「I accept the terms in the License Agreement」にチェックをし、Next をクリックします。

Destination Folder - Next をクリックします。

Custom Setup - Next をクリックします。

Tools for Native Modules - Next をクリックします。

Ready to install Node.js - Install をクリックし、完了後に Finish をクリックします。

CLI を開き、下記コマンドを入力します。

```
$ node -v
```

バージョンが返ってくれば成功です。

### Vue.js Install

#### Mac&Windows

CLI に下記コマンドを入力します。

```
$ npm install -g @vue/cli
```

「permission denied」というエラーが出る場合は以下のコマンドを入力してください。

```
$ sudo npm install -g @vue/cli
```

下記のコードを入力して、バージョン情報が確認できればインストール完了です。

```
$ vue --version
```

### Yarn Install

#### Mac&Windows

下記コマンドを入力します。

```
$ npm install -g yarn
```

permission denied」というエラーが出る場合は以下のコマンドを入力してください。

```
$ sudo npm install -g yarn
```

下記のコードを入力して、バージョン情報が確認できればインストール完了です。

```
$ yarn --version
```

## Data Edit

リポジトリを取得します。

CLI を開きます。
任意の場所にリポジトリをコピーします。

```
$ git clone https://github.com/YUKINA-gif/Rese.git
```

ディレクトリに移動し、npm パッケージをインストールし、脆弱性の修正をします。

```
$ cd Rese

$ npm install

$ npm audit fix
```

## Access

アクセスし、動作を確認します。

ディレクトリ直下で下記コマンドを入力し、ローカルサーバーを起動します。

```
$ yarn serve
```

立ち上がったサーバーにアクセスします。

## Function

機能一覧です。

## トップページ

ユーザーが投稿したライブ情報をみることができます。

#### URL:

http://localhost:8080/

### 新規会員登録

会員登録ができます。

#### URL:

http://localhost:8080/register

名前、メールアドレス、パスワードの入力が必須です。

各バリデーションは以下です。
| 各項目 | 条件 | 入力例 |
| --- | --- |--- |
| 名前 | 入力必須 |山田太郎 |
| メールアドレス | 入力必須・文字列不可(メールアドレスのみ) |test@example.com |
| パスワード | 入力必須・8 文字以上～ |password|

### ログイン

ログインができます。

会員でない場合のために会員登録のリンクもあります。

#### URL:

http://localhost:8080/login

### プロフィール

ログインが完了している場合、
ユーザーのプロフィールとアイコンを変更することができます。

#### URL:

http://localhost:8080/profile

ユーザーのプロフィールを変更する場合は、変更内容を入力後、”変更する”をクリックすれば変更できます。
また。画像を変更する場合は、画像を選択し、”画像変更”をクリックすれば変更できます。

### お気に入り

投稿に対して、お気に入りすることができます。

#### URL:

http://localhost:8080/favorite

お気に入りしている場合、その投稿の内容が表示されます。
ログインしていなければ、ログインページへ遷移します。

### 行きたい

投稿に対して、行きたいことができます。
行きたいとは、ライブのチケットが余ったり、一緒に行く相手がいない時に、ライブ情報を投稿して、相手を見つける機能になります。

#### URL:

http://localhost:8080/want

行きたいしている場合、その投稿の内容が表示されます。
ログインしていなければ、ログインページへ遷移します。

### コメント

ログインが完了している場合、
投稿に対するコメントを表示、書き込みが出来る機能です。

#### URL:

http://localhost:8080/comment/1

コメントを書き込む場合、コメント内容を入力後”コメント”をクリックすれば、コメント投稿できます。ログインしていなければ"レビューを投稿"をクリックしたタイミングでログインページへ遷移します。
