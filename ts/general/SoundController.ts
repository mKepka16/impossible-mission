const soundFilesNames = [
  'dieByZap', // done
  'droid', // done
  'droidTurn', // done
  'elevatorStart', // done
  'elevatorStop', // done
  'falling', //done
  'jumpLeft', //done
  'jumpRight', //done
  'stepLeft', //done
  'stepRight', //done
  'zap1',
  'zap2',
  'zap3',
  'zap4',
  'zap5',
] as const;
const soundFileExt = 'ogg';
const soundFilesDir = './assets/sounds/';

type Sounds = {
  [index in typeof soundFilesNames[number]]?: {
    path: string;
    instance?: HTMLAudioElement;
  };
};

class SoundController {
  sounds: Sounds = {};

  constructor() {
    soundFilesNames.forEach((fileName) => {
      const sound = {
        path: `${soundFilesDir}${fileName}.${soundFileExt}`,
      };

      this.sounds[fileName] = sound;
    });
  }

  play(
    sound: typeof soundFilesNames[number] | HTMLAudioElement,
    loop: boolean = false
  ) {
    if (sound instanceof HTMLAudioElement) {
      sound.loop = loop;
      sound.play();
    } else {
      const audio = this.sounds[sound];
      audio.instance = new Audio(audio.path);
      if (['elevatorStart', 'droid'].includes(sound)) {
        audio.instance.loop = true;
      }
      audio.instance.play();
    }
  }

  stop(sound: typeof soundFilesNames[number] | HTMLAudioElement) {
    if (sound instanceof HTMLAudioElement) {
      sound.pause();
    } else {
      const audio = this.sounds[sound];
      audio.instance?.pause();
      audio.instance = undefined;
    }
  }

  isPlaying(sound: typeof soundFilesNames[number] | HTMLAudioElement): boolean {
    if (sound instanceof HTMLAudioElement) {
      return (!sound.paused || sound.currentTime) === true;
    } else {
      const audio = this.sounds[sound];
      if (audio.instance === undefined) return false;
      if (!audio.instance.paused || audio.instance.currentTime) return true;
      return false;
    }
  }

  getAudio(sound: typeof soundFilesNames[number]): HTMLAudioElement {
    const audio = this.sounds[sound];
    return new Audio(audio.path);
  }
}

export default new SoundController();
