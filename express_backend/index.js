import {init as startupLyrics} from './api_lyrics/startup.js'
import {init as startupMatcher} from './api_matcher/startup.js'
import {init as startupAudio} from './api_audio/startup.js'
import {init as startupPost} from './api_post_new/startup.js'
import {connectMongoose, clearDatabase} from './common_base/common.js'
import {createNewTestSong} from './common_base/test.js'

connectMongoose()
clearDatabase()
createNewTestSong()

startupLyrics()
startupMatcher()
startupAudio()
startupPost()
