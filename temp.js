const fs = FileStream;

function response(room, msg, sender, isGroupChat, replier, imageDB, packageName) {
    var path = 'sdcard/' + sender + 'level/exp.txt';
    var Maxexp = fs.read('sdcard/' + sender + 'level/Max.txt');
    if (msg == "?전투") {
        var lvl = Number(fs.read(path));
        var lvl1 = lvl + 10;
        var lvl2 = 100;
        fs.write('sdcard/' + sender + 'level/Max.txt', 100);
        replier.reply(fs.write(path, lvl1) + '/' + Maxexp);
    }
    if (msg == "?레벨업" && Maxexp <= fs.read(path, lvl1)) {
        var exp = Number(fs.read('sdcard/' + sender + 'level/lvl.txt'));
        var exp1 = exp + 1;
        fs.write('sdcard/' + sender + 'level/lvl.txt', exp1);
        fs.write(path, lvl1 - lvl1);
        replier.reply('레벨업 하셨습니다!\n현재 레벨: ' + fs.read('sdcard/' + sender + 'level/lvl.txt'));
    }
    var exp3 = Number(fs.read(path, lvl1)) + '/' + Maxexp;
    var exp2 = fs.read('sdcard/' + sender + 'level/lvl.txt');
    if (msg == "?정보") {
        replier.reply('이름: ' + sender + '\n레벨: ' + exp2 + '\n경험치: ' + exp3);
    }
}