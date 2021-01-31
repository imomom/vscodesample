//モジュール 'vscode'にはVSCode拡張性APIが含まれています
//モジュールをインポートし、以下のコードでエイリアスvscodeを使用して参照します
import * as vscode from 'vscode';
import {writeFile, readdir,unlink, fstat, stat, existsSync} from "fs";

//このメソッドは、拡張機能がアクティブ化されたときに呼び出されます
//コマンドが最初に実行されたときに拡張機能がアクティブ化されます
function makefiles(path: string){
	// return new Promise(function(resolve, reject){
	// 		writeFile(path,Buffer.from(''),function(error){
	// 			if(error)reject(error);
	// 		});
	// 		resolve("ok");
	// })
	writeFile(path + '.in',Buffer.from(''),function(error){console.log(error)});
	writeFile(path + '.out',Buffer.from(''),function(error){console.log(error)});
}
function openfiles(path :string){
	vscode.window.showTextDocument(vscode.Uri.parse(path+'.out'),{
		preserveFocus: false,
		preview: false
	}).then(_=>{
		vscode.window.showTextDocument(vscode.Uri.parse(path+'.in'),{
			preserveFocus: false,
			preview: true,
		}).then(_=>{});
	})
}
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
				makefiles(writeFilePath);
				//非同期処理何も分からん　回避策です・・・
				if(existsSync(writeFilePath+'.in') && existsSync(writeFilePath+'.out')){
					openfiles(writeFilePath);
				}else vscode.window.showErrorMessage("ファイルを開けませんでした。opensampleコマンドをお試しください");
			}				
		});
	});
context.subscriptions.push(addsample);
//私魔女のキキ！こっちはコールバック地獄のファイル削除コマンド！
//修正したいよね　また力があるときに・・・
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
let opensample = vscode.commands.registerCommand('extention.opensample', () => {
	//最後のファイルを開く処理
		let currentPath = vscode.window.visibleTextEditors[0].document.uri.path;
		let sampleDir = currentPath.slice(0,currentPath.lastIndexOf('/'))+'/test';
		console.log(sampleDir.toString());
		readdir(sampleDir,(err,filecnt)=>{
			if(err){
				vscode.window.showWarningMessage("testフォルダがありません 問題ソースコードを開いていない可能性があります");
				return;
			}else{
				let cntsample = filecnt.length/2;
				console.log(cntsample);
				let writeFilePath = sampleDir+'/sample-'+cntsample;
				//非同期処理何も分からん　回避策です・・・
				if(existsSync(writeFilePath+'.in') && existsSync(writeFilePath+'.out')){
					openfiles(writeFilePath);
				}else vscode.window.showErrorMessage("ファイルを開けませんでした。opensampleコマンドをお試しください");
			}				
		});
	});
context.subscriptions.push(opensample);
}

//このメソッドは、拡張機能が非アクティブ化されたときに呼び出されます
export function deactivate() {}
