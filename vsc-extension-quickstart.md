＃VS CodeExtensionへようこそ

##フォルダの内容

*このフォルダには、拡張子に必要なすべてのファイルが含まれています。
* `package.json`-これは、拡張子とコマンドを宣言するマニフェストファイルです。
  *サンプルプラグインはコマンドを登録し、そのタイトルとコマンド名を定義します。この情報を使用して、VSCodeはコマンドパレットにコマンドを表示できます。プラグインをロードする必要はまだありません。
* `src /extension.ts`-これはコマンドの実装を提供するメインファイルです。
  *ファイルは1つの関数 `activate`をエクスポートします。これは、拡張機能が最初にアクティブ化されたとき（この場合はコマンドを実行することによって）に呼び出されます。 `activate`関数内で` registerCommand`を呼び出します。
  *コマンドの実装を含む関数を2番目のパラメータとして `registerCommand`に渡します。

##すぐに立ち上がって実行する

* `F5`を押すと、拡張機能がロードされた状態で新しいウィンドウが開きます。
*コマンドパレットからコマンドを実行するには、（Macの場合は `Ctrl + Shift + P`または` Cmd + Shift + P`）を押し、 `HelloWorld`と入力します。
* `src / extension.ts`内のコードにブレークポイントを設定して、拡張機能をデバッグします。
*デバッグコンソールで拡張機能からの出力を検索します。

##変更を加える

* `src / extension.ts`のコードを変更した後、デバッグツールバーから拡張機能を再起動できます。
* VS Codeウィンドウに拡張機能をリロード（Macの場合は `Ctrl + R`または` Cmd + R`）して、変更をロードすることもできます。


## APIを調べる

*ファイル `node_modules / @ types / vscode / index.d.ts`を開くと、APIのフルセットを開くことができます。

##テストを実行する

*デバッグビューレット（Macの場合は `Ctrl + Shift + D`または` Cmd + Shift + D`）を開き、起動構成のドロップダウンから[拡張テスト]を選択します。
* `F5`を押して、拡張機能をロードした状態で新しいウィンドウでテストを実行します。
*デバッグコンソールでテスト結果の出力を参照してください。
* `src / test / suite / extension.test.ts`に変更を加えるか、` test / suite`フォルダー内に新しいテストファイルを作成します。
  *提供されたテストランナーは、名前パターン `**。test.ts`に一致するファイルのみを考慮します。
  * `test`フォルダー内にフォルダーを作成して、テストを任意の方法で構成できます。

##さらに進む

 * [拡張機能をバンドル]（https://code.visualstudio.com/api/working-with-extensions/bundling-extension）により、拡張機能のサイズを縮小し、起動時間を改善します。
 * VSCode拡張機能マーケットプレイスで[拡張機能を公開]（https://code.visualstudio.com/api/working-with-extensions/publishing-extension）。
 * [継続的インテグレーション]（https://code.visualstudio.com/api/working-with-extensions/continuous-integration）を設定してビルドを自動化します。