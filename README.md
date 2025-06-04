# マニュアルテンプレート集

このリポジトリは、業務マニュアルのテンプレートと作成ノウハウをまとめた静的Webサイトです。`index.html` を開くとテンプレート一覧が表示され、必要なファイルをダウンロードできます。

## ディレクトリ構成
- `index.html` - サイトのトップページ
- `assets/` - CSS・JavaScript・画像などの共通リソース
- `template/` - 各テンプレートのフォルダ。スクリーンショットと `.zip` ファイルを含みます
- `howto/` - マニュアル作成や運用方法を解説したページ
- `tags/` - テンプレートをタグ別にまとめたHTMLページ

## 使い方
`index.html` を直接ブラウザで開くか、以下のように簡易サーバを起動してください。

```bash
python3 -m http.server
```

起動後、ブラウザで `http://localhost:8000` にアクセスするとサイトを閲覧できます。

## SSI を利用する場合
サイトの各ページでは `partials/header.html` と `partials/footer.html` を Server Side Includes(SSI) で読み込みます。SSI が利用できるサーバーを起動することでヘッダーとフッターが正しく表示されます。

### Apache の例
Apache をインストールし、`httpd.conf` に以下を追記します。

```apache
Options +Includes
AddOutputFilter INCLUDES .html
```

設定後にサーバーを起動し、ブラウザでアクセスしてください。

### nginx の例
`nginx.conf` の `server` ブロックに `ssi on;` を追加してからサーバーを再起動します。

## テンプレートの追加方法
新しいテンプレートは `template/` 以下にフォルダを作成して追加します。追加後は `index.html` とタグページを更新してください。

## リンクチェック
HTML ファイルのリンク切れは `scripts/check_links.sh` で検査できます。

```bash
bash scripts/check_links.sh
```

外部リンクには `curl` を使って HEAD リクエストを送り、404 が返った場合はエラーとなります。ローカルリンクは参照先ファイルの有無を確認します。
