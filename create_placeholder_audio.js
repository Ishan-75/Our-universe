import fs from 'fs';
import path from 'path';

function createWavBuffer(sampleRate, durationSec, sampleGenerator) {
  const numSamples = Math.floor(sampleRate * durationSec);
  const blockAlign = 2; // 16-bit mono = 2 bytes
  const byteRate = sampleRate * blockAlign;
  const dataSize = numSamples * blockAlign;
  const buffer = Buffer.alloc(44 + dataSize);

  // RIFF header
  buffer.write('RIFF', 0);
  buffer.writeUInt32LE(36 + dataSize, 4);
  buffer.write('WAVE', 8);

  // fmt subchunk
  buffer.write('fmt ', 12);
  buffer.writeUInt32LE(16, 16); // Subchunk1Size (16 for PCM)
  buffer.writeUInt16LE(1, 20);  // AudioFormat (1 for PCM)
  buffer.writeUInt16LE(1, 22);  // NumChannels (1 = mono)
  buffer.writeUInt32LE(sampleRate, 24);
  buffer.writeUInt32LE(byteRate, 28);
  buffer.writeUInt16LE(blockAlign, 32);
  buffer.writeUInt16LE(16, 34); // BitsPerSample (16)

  // data subchunk
  buffer.write('data', 36);
  buffer.writeUInt32LE(dataSize, 40);

  for (let i = 0; i < numSamples; i++) {
    const t = i / sampleRate;
    let sample = sampleGenerator(t, durationSec);
    // Clamp to -1..1
    sample = Math.max(-1, Math.min(1, sample));
    const intSample = Math.floor(sample * 32767);
    buffer.writeInt16LE(intSample, 44 + i * 2);
  }

  return buffer;
}

const sampleRate = 44100;
const soundsDir = path.resolve('public/assets/sounds');
const songsDir = path.resolve('public/assets/songs');

fs.mkdirSync(soundsDir, { recursive: true });
fs.mkdirSync(songsDir, { recursive: true });

// 1. click: sweet metallic starlight tick
const clickWav = createWavBuffer(sampleRate, 0.15, (t) => {
  const env = Math.exp(-t * 30);
  return (Math.sin(2 * Math.PI * 1800 * t) + 0.5 * Math.sin(2 * Math.PI * 2600 * t)) * env * 0.4;
});
fs.writeFileSync(path.join(soundsDir, 'click.mp3'), clickWav);

// 2. page-open: soft resonant opening chord
const pageOpenWav = createWavBuffer(sampleRate, 0.6, (t) => {
  const env = Math.exp(-t * 5);
  return (Math.sin(2 * Math.PI * 440 * t) * 0.4 +
          Math.sin(2 * Math.PI * 554.37 * t) * 0.3 +
          Math.sin(2 * Math.PI * 659.25 * t) * 0.3) * env;
});
fs.writeFileSync(path.join(soundsDir, 'page-open.mp3'), pageOpenWav);

// 3. heart-pop: bubbly warm heart sound
const heartPopWav = createWavBuffer(sampleRate, 0.25, (t) => {
  const freq = 300 + 400 * Math.sin(t * Math.PI / 0.25);
  const env = Math.sin(t * Math.PI / 0.25);
  return Math.sin(2 * Math.PI * freq * t) * env * 0.5;
});
fs.writeFileSync(path.join(soundsDir, 'heart-pop.mp3'), heartPopWav);

// 4. transition: celestial swoosh
const transitionWav = createWavBuffer(sampleRate, 1.2, (t) => {
  const env = Math.sin(t * Math.PI / 1.2);
  const f = 200 + t * 600;
  return (Math.sin(2 * Math.PI * f * t) + (Math.random() * 2 - 1) * 0.15) * env * 0.4;
});
fs.writeFileSync(path.join(soundsDir, 'transition.mp3'), transitionWav);

// 5. letter-open: intimate chime arpeggio
const letterOpenWav = createWavBuffer(sampleRate, 1.8, (t) => {
  const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
  let val = 0;
  notes.forEach((freq, idx) => {
    const startTime = idx * 0.25;
    if (t >= startTime) {
      const localT = t - startTime;
      val += Math.sin(2 * Math.PI * freq * localT) * Math.exp(-localT * 4) * 0.3;
    }
  });
  return val;
});
fs.writeFileSync(path.join(soundsDir, 'letter-open.mp3'), letterOpenWav);

// 6. ambient: deep cosmic drone
const ambientWav = createWavBuffer(sampleRate, 6.0, (t) => {
  const lfo = 0.8 + 0.2 * Math.sin(2 * Math.PI * 0.2 * t);
  return (Math.sin(2 * Math.PI * 110 * t) * 0.4 +
          Math.sin(2 * Math.PI * 164.81 * t) * 0.3 +
          Math.sin(2 * Math.PI * 220 * t) * 0.2) * lfo * 0.3;
});
fs.writeFileSync(path.join(soundsDir, 'ambient.mp3'), ambientWav);

// 7. Song 01: "Starlight Reverie" (12s peaceful romantic lofi arpeggio loop)
const song01Wav = createWavBuffer(sampleRate, 12.0, (t) => {
  const chords = [
    [261.63, 329.63, 392.00, 493.88], // Cmaj7
    [220.00, 261.63, 329.63, 392.00], // Am7
    [174.61, 220.00, 261.63, 329.63], // Fmaj7
    [196.00, 246.94, 293.66, 392.00], // G7
  ];
  const bar = Math.floor(t / 3) % chords.length;
  const currentChord = chords[bar];
  const localBarTime = t % 3;
  const noteIdx = Math.floor((localBarTime / 3) * 6) % currentChord.length;
  const noteFreq = currentChord[noteIdx];
  const noteTime = localBarTime % 0.5;
  const noteEnv = Math.exp(-noteTime * 4);
  const pad = (Math.sin(2 * Math.PI * (currentChord[0] / 2) * t) * 0.25);
  const lead = Math.sin(2 * Math.PI * noteFreq * noteTime) * noteEnv * 0.35;
  return (pad + lead) * 0.5;
});
fs.writeFileSync(path.join(songsDir, 'song-01.mp3'), song01Wav);

// 8. Song 02: "Midnight Aurora" (12s warm celestial melody)
const song02Wav = createWavBuffer(sampleRate, 12.0, (t) => {
  const chords = [
    [293.66, 369.99, 440.00, 554.37], // Dmaj7
    [246.94, 293.66, 369.99, 440.00], // Bm7
    [196.00, 246.94, 293.66, 369.99], // Gmaj7
    [220.00, 277.18, 329.63, 440.00], // A7
  ];
  const bar = Math.floor(t / 3) % chords.length;
  const currentChord = chords[bar];
  const localBarTime = t % 3;
  const noteIdx = Math.floor((localBarTime / 3) * 6) % currentChord.length;
  const noteFreq = currentChord[noteIdx];
  const noteTime = localBarTime % 0.5;
  const noteEnv = Math.exp(-noteTime * 3.5);
  const pad = (Math.sin(2 * Math.PI * (currentChord[0] / 2) * t) * 0.2);
  const lead = Math.sin(2 * Math.PI * noteFreq * noteTime) * noteEnv * 0.3;
  return (pad + lead) * 0.5;
});
fs.writeFileSync(path.join(songsDir, 'song-02.mp3'), song02Wav);

// 9. Song 03: "Constellation Waltz" (12s gentle dream nocturne)
const song03Wav = createWavBuffer(sampleRate, 12.0, (t) => {
  const chords = [
    [329.63, 392.00, 493.88, 587.33], // Em7
    [261.63, 329.63, 392.00, 523.25], // Cmaj7
    [196.00, 246.94, 293.66, 392.00], // G
    [220.00, 277.18, 329.63, 440.00], // A
  ];
  const bar = Math.floor(t / 3) % chords.length;
  const currentChord = chords[bar];
  const localBarTime = t % 3;
  const noteIdx = Math.floor((localBarTime / 3) * 6) % currentChord.length;
  const noteFreq = currentChord[noteIdx];
  const noteTime = localBarTime % 0.5;
  const noteEnv = Math.exp(-noteTime * 3);
  const pad = (Math.sin(2 * Math.PI * (currentChord[0] / 2) * t) * 0.2);
  const lead = Math.sin(2 * Math.PI * noteFreq * noteTime) * noteEnv * 0.3;
  return (pad + lead) * 0.5;
});
fs.writeFileSync(path.join(songsDir, 'song-03.mp3'), song03Wav);

console.log('Successfully generated all placeholder audio files!');
