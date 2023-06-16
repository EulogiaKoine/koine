// 패키지 테스트용 봇 - API2
const bot = BotManager.getCurrentBot()
require('koine')(this)
kpack.init()
power.boost()

// meta
const Admin = {
    hash: Database.readObject('admin'),
    save(){ Database.writeObject('admin', this.hash) }
}
const Rooms = Database.readObject('room')
Rooms.save = function(){ Database.writeObject('room', this) }
const SD = android.os.Environment.getExternalStorageDirectory().getAbsolutePath()
const TEST = SD+'/테스트'
const FV = '\u200b'.repeat(500)
const stop = () => java.lang.System.exit(0)


// 와!
const dl = require('DeepLearning')
const Arr = dl.Arr
const ds = require('ds')
const Sqlite = require('Sqlite')
const { Calculator, Sign } = require('Calculator')


// 시럽
const SYRUP = SD+'/syrup'


// PIPI
const PIPI = SD + '/PIPI'


// eval
evaluate.prefix = 'e'
Array.prototype.splice.apply(evaluate.hash, [0, 0].concat(Admin.hash))
Array.prototype.splice.apply(evaluate.room, [0, 0].concat(Rooms))
evaluate.on(evaluate.ParameterType.LEGACY)