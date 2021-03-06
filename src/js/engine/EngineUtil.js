var paths = Util.paths

window.EngineUtil = {}
EngineUtil.SaveFile = require(paths.eng('SaveFile'))
EngineUtil.saveFile = new EngineUtil.SaveFile()
EngineUtil.Sound = require(paths.eng('Sound'))
EngineUtil.SoundBank = require(paths.eng('SoundBank'))
EngineUtil.Vect = require(paths.eng('Vect'))
EngineUtil.Box = require(paths.eng('Box'))
EngineUtil.Input = require(paths.eng('Input'))
EngineUtil.KeyInput = require(paths.eng('KeyInput'))
EngineUtil.PlayerInputs = require(paths.eng('PlayerInputs'))
EngineUtil.InputListener = require(paths.eng('InputListener'))
EngineUtil.Engine = require(paths.eng('Engine'))
EngineUtil.GameObj = require(paths.eng('GameObj'))
EngineUtil.Scene = require(paths.eng('Scene'))
EngineUtil.SpriteSheet = require(paths.eng('SpriteSheet'))
EngineUtil.Sprite = require(paths.eng('Sprite'))
