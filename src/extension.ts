//モジュール 'vscode'にはVSCode拡張性APIが含まれています
//モジュールをインポートし、以下のコードでエイリアスvscodeを使用して参照します
import * as vscode from 'vscode';
import {writeFile, readdir,unlink} from "fs";

//このメソッドは、拡張機能がアクティブ化されたときに呼び出されます
//コマンドが最初に実行されたときに拡張機能がアクティブ化されます
export function activate(context: vscode.ExtensionContext) {

//コンソールを使用して診断情報（console.log）とエラー（console.error）を出力します
//このコード行は、拡張機能がアクティブ化されたときに1回だけ実行されます
	console.log('Congratulations, your extension "helloworld" is now active!');

//コマンドはpackage.jsonファイルで定義されています
//ここで、registerCommandを使用してコマンドの実装を提供します
// registerCommandの引数はpackage.jsonのcommands内のcommandと一致する必要があります
	let addsample = vscode.commands.registerCommand('extention.addsample', () => {
	//ここに配置したコードは、コマンドが実行されるたびに実行されます
		let currentPath = vscode.window.visibleTextEditors[0].document.uri.path;
		let sampleDir = currentPath.slice(0,currentPath.lastIndexOf('/'))+'/test';
		console.log(sampleDir.toString());
		readdir(sampleDir,(err,filecnt)=>{
			if(err){
				vscode.window.showWarningMessage("testフォルダがありません 問題ソースコードを開いていない可能性があります");
				return;
			}else{

				let cntsample = filecnt.length/2 + 1;
				console.log(cntsample);
				let writeFilePath = sampleDir+'/sample-'+cntsample;
				vscode.window.showInputBox({
					ignoreFocusOut:true,
					placeHolder:"サンプルの入力値を入力",
					prompt:"サンプルの入力値を入力 改行はカンマで区切ってください"
				}).then((input)=>{
					if(input == undefined || input == ""){
						vscode.window.showErrorMessage("値が空です");
						return;
					}else{
						vscode.window.showInputBox({
							ignoreFocusOut:true,
							placeHolder:"サンプルの出力値を入力",
							prompt:"サンプルの出力値を入力 改行はカンマで区切ってください"
						}).then((output)=>{
							if(output == undefined || output == ""){
								vscode.window.showErrorMessage("値が空です");
								return;
							}else{
								
								writeFile(writeFilePath+'.in',Buffer.from((input.replace(/,/g,'\n'))+"\n"),(_)=>{});
								writeFile(writeFilePath+'.out',Buffer.from((output.replace(/,/g,'\n'))+"\n"),(_)=>{});
								vscode.window.showInformationMessage('サンプルの追加が完了しました');
							}
						});
					}
				});
			}				
		});
	});
context.subscriptions.push(addsample);
let delsample = vscode.commands.registerCommand('extention.delsample', () => {
	//ここに配置したコードは、コマンドが実行されるたびに実行されます
		let ss = vscode.window.visibleTextEditors[0].document.uri.path;
		let sampleDir = ss.slice(0,ss.lastIndexOf('/'))+'/test';
		console.log(sampleDir.toString());
		readdir(sampleDir,(err,_)=>{
			if(err){
				vscode.window.showWarningMessage("testフォルダがありません 問題ソースコードを開いていない可能性があります");
				return;
			}else{
			vscode.window.showInputBox({
				ignoreFocusOut:true,
				placeHolder:"削除したいサンプルの番号を入力(複数の場合カンマ区切り)"
			}).then((input)=>{
				if(input == undefined || input == ""){
					vscode.window.showErrorMessage("値が空です");
					return;
				}else{
					let num = input.replace(' ','');
					let nums = num.split(',');
					nums.forEach(deleteNum=>{
						let deleteFilePath = sampleDir+"/sample-"+deleteNum+".";
						unlink(deleteFilePath+"in",(err)=>{
							if(err){
								vscode.window.showErrorMessage("ファイルが存在しないか、問題のソースコードを開いていない可能性があります");
								return;
							}
							else{
								unlink(deleteFilePath+"out",(err)=>{
									if(err){
										vscode.window.showErrorMessage("ファイルが存在しないか、問題のソースコードを開いていない可能性があります");
										return;
									}
									else{
										vscode.window.showInformationMessage("削除しました");
									}
								});
							}
						});
					});
				}
			});
		}				
	});
});
context.subscriptions.push(delsample);
}

//このメソッドは、拡張機能が非アクティブ化されたときに呼び出されます
export function deactivate() {}
