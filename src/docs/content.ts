import type { SkyPhase } from '../index';

export interface PropDoc {
  name: string;
  type: string;
  default: string;
  description: string;
}

export interface ComponentDoc {
  slug: string;
  name: string;
  japanese: string;
  group: string;
  motif: string;
  summary: string;
  detail: string;
  usage: string;
  props: PropDoc[];
  notes?: string[];
  related?: string[];
}

export interface PhaseInfo {
  id: SkyPhase;
  name: string;
  reading: string;
  chapter: string;
  hours: string;
  keywords: string;
  description: string;
}

export const PHASES: PhaseInfo[] = [
  {
    id: 'midnight',
    name: '群青',
    reading: 'ぐんじょう',
    chapter: '一',
    hours: '00:00 – 01:59',
    keywords: '月明かり・星屑',
    description: '街が眠りについた最も深い時間。月と星だけが灯り、紙もインクも夜の色に沈みます。',
  },
  {
    id: 'night',
    name: '第一夜',
    reading: 'だいいちや',
    chapter: '二',
    hours: '20:00 – 03:59',
    keywords: '星屑・蛍火・遠花火',
    description: '群青の夜。紙は夜空色に反転し、インクは月明かりのような淡い茜へ変わります。',
  },
  {
    id: 'dawn',
    name: '夜明け',
    reading: 'よあけ',
    chapter: '三',
    hours: '04:00 – 06:59',
    keywords: '薄明・朝霧',
    description: '藍がほどけ始める時間。霧が地面にたまり、コントラストがゆっくり戻ってきます。',
  },
  {
    id: 'morning',
    name: '朝霧',
    reading: 'あさぎり',
    chapter: '四',
    hours: '07:00 – 09:59',
    keywords: '露・雲・淡い緑',
    description: '露が光り、雲がゆっくり流れる朝。柔らかい紙色が朝の手帳に似合います。',
  },
  {
    id: 'day',
    name: '白昼',
    reading: 'はくちゅう',
    chapter: '五',
    hours: '10:00 – 11:59',
    keywords: '青空・白雲',
    description: '影が短くなる時間。空気が澄み、紙の白とインクの黒が最もくっきりします。',
  },
  {
    id: 'dusk',
    name: '夕凪',
    reading: 'ゆうなぎ',
    chapter: '六',
    hours: '12:00 – 16:59',
    keywords: '通り雨・橙の残照',
    description: '昼の名残がまだ空に残る時間。雨粒が静かに落ち、紙の白さが一番強く見えます。',
  },
  {
    id: 'golden',
    name: '金色',
    reading: 'きんいろ',
    chapter: '七',
    hours: '17:00 – 17:59',
    keywords: '夕日・光塵',
    description: '茜に染まる直前のひととき。低い太陽が紙と文字を琥珀色に染めます。',
  },
  {
    id: 'twilight',
    name: '茜さす',
    reading: 'あかねさす',
    chapter: '八',
    hours: '18:00 – 19:59',
    keywords: '光塵・茜色',
    description: '空が群青へ沈む少し前。光塵が漂い、アクセントの茜が最も鮮やかになります。',
  },
];

export const COMPONENTS: ComponentDoc[] = [
  {
    slug: 'akane-theme-provider',
    name: 'AkaneThemeProvider',
    japanese: '空の時間帯を司る',
    group: 'テーマ',
    motif: '移ろう空',
    summary: '8つの時間帯と、それに伴う紙・インク・アクセント色を配下全体へ届けます。',
    detail:
      'phase を渡せば完全制御、defaultPhase なら非制御になります。syncWithSystemTime を有効にすると現在時刻に追従し、手動で切り替えるまで同期を一時停止します。useAkaneTheme はプロバイダの外では null を返すため、呼び出し側でフォールバックを用意してください。',
    usage: `import { AkaneThemeProvider, useAkaneTheme } from '@tatsuyamiura2667/akane-lib';

function PhaseSwitch() {
  const theme = useAkaneTheme();
  return <button onClick={() => theme?.nextPhase()}>空を進める</button>;
}

export function App() {
  return (
    <AkaneThemeProvider defaultPhase="night" syncWithSystemTime>
      <PhaseSwitch />
    </AkaneThemeProvider>
  );
}`,
    props: [
      { name: 'children', type: 'ReactNode', default: '必須', description: 'テーマを適用する要素' },
      { name: 'phase', type: 'SkyPhase', default: '—', description: '外部から時間帯を制御する' },
      { name: 'defaultPhase', type: 'SkyPhase', default: "'twilight'", description: '非制御時の初期値' },
      { name: 'onPhaseChange', type: '(phase: SkyPhase) => void', default: '—', description: '変化時に呼ばれる' },
      { name: 'autoCycle', type: 'boolean', default: 'false', description: '一定間隔で8つの空を循環' },
      { name: 'intervalMs', type: 'number', default: '8000', description: '循環の間隔（ミリ秒）' },
      { name: 'syncWithSystemTime', type: 'boolean', default: 'false', description: '現在時刻と同期する' },
      { name: 'className', type: 'string', default: "''", description: 'ラッパーの追加クラス' },
    ],
    notes: [
      'useAkaneTheme() は phase / setPhase / nextPhase / isSystemSynced / resetToSystemTime を返します。',
      'getSkyPhaseFromDate(date) で、時刻から SkyPhase を求めることもできます。',
    ],
    related: ['twilight-sky', 'bookmark-ribbon'],
  },
  {
    slug: 'twilight-sky',
    name: 'TwilightSky',
    japanese: '背景の空',
    group: 'テーマ',
    motif: '夕凪 / 茜さす / 第一夜',
    summary: '時間帯ごとのグラデーション空と、雨・光塵・夕日・雲・星・月の環境演出を重ねる背景コンテナです。',
    detail:
      'AkaneThemeProvider の内側では phase を自動継承します。単独で使う場合は phase または autoCycle を指定してください。ambient は時間帯に合う演出（雨・光塵・夕日・雲と露・星と月など）を、fireworks は夜に遠花火を加えます。oilPaint は筆致と画布の目を重ね、false で外せます。',
    usage: `import { TwilightSky } from '@tatsuyamiura2667/akane-lib';

<TwilightSky ambient fireworks phase="night">
  <p>夜のページの内容</p>
</TwilightSky>`,
    props: [
      { name: 'children', type: 'ReactNode', default: '必須', description: '前面に表示する内容' },
      { name: 'phase', type: 'SkyPhase', default: '—', description: '単独使用時の時間帯' },
      { name: 'ambient', type: 'boolean', default: 'false', description: '時間帯に応じた環境演出' },
      { name: 'fireworks', type: 'boolean', default: 'false', description: '夜に遠花火を追加' },
      { name: 'oilPaint', type: 'boolean', default: 'true', description: '油絵の筆致レイヤー' },
      { name: 'autoCycle', type: 'boolean', default: 'false', description: '単独使用時の自動循環' },
      { name: 'intervalMs', type: 'number', default: '8000', description: '循環の間隔（ミリ秒）' },
      { name: 'className', type: 'string', default: "''", description: '追加クラス名' },
    ],
    notes: ['環境演出はすべて aria-hidden。prefers-reduced-motion が有効なら非表示になります。'],
    related: ['akane-theme-provider', 'sakura-thief-overlay'],
  },
  {
    slug: 'letter-card',
    name: 'LetterCard',
    japanese: '便箋',
    group: 'レイアウト',
    motif: 'エルマ / エイミー',
    summary: '詩的な行間と字間の便箋コンテナ。縦書きにも切り替えられます。',
    detail:
      'date は冒頭、signature は末尾に配置されます。vertical を付けると writing-mode: vertical-rl になり、手紙や短い詩の表示に向きます。oilPaint を付けると紙に厚塗りの質感が加わります。',
    usage: `import { LetterCard } from '@tatsuyamiura2667/akane-lib';

<LetterCard date="八月三十一日" signature="エイミーへ">
  夏の終わりの匂いがした。
</LetterCard>`,
    props: [
      { name: 'children', type: 'ReactNode', default: '必須', description: '本文' },
      { name: 'date', type: 'string', default: '—', description: '日付・章題' },
      { name: 'signature', type: 'string', default: '—', description: '署名・差出人' },
      { name: 'vertical', type: 'boolean', default: 'false', description: '縦書きにする' },
      { name: 'oilPaint', type: 'boolean', default: 'false', description: '紙に油絵テクスチャを重ねる' },
      { name: 'className', type: 'string', default: "''", description: '追加クラス名' },
    ],
    related: ['lyric-lines', 'white-lily-seal'],
  },
  {
    slug: 'cassette-player',
    name: 'CassettePlayer',
    japanese: 'カセットプレイヤー',
    group: '入力・演出',
    motif: '靴とカセットテープ',
    summary: '回るリールと進むテープで、時間の経過そのものを可視化するプレイヤーです。',
    detail:
      'audioSrc を渡すと実際の音声を再生します。省略すると durationSec の長さだけ動くビジュアルプレイヤーとして動くので、歌詞のタイムラインと同期させやすくなります。',
    usage: `import { CassettePlayer } from '@tatsuyamiura2667/akane-lib';

<CassettePlayer
  side="A"
  title="第一夜 — 夢の記憶"
  durationSec={14}
  onTimeUpdate={(sec) => console.log(sec)}
/>`,
    props: [
      { name: 'title', type: 'string', default: '必須', description: 'ラベルのタイトル' },
      { name: 'side', type: "'A' | 'B'", default: "'A'", description: 'テープの面' },
      { name: 'audioSrc', type: 'string', default: '—', description: '再生する音声の URL' },
      { name: 'durationSec', type: 'number', default: '180', description: '擬似再生の長さ（秒）' },
      { name: 'onTimeUpdate', type: '(sec: number) => void', default: '—', description: '経過秒数の通知' },
      { name: 'className', type: 'string', default: "''", description: '追加クラス名' },
    ],
    related: ['lyric-lines', 'train-window-frame'],
  },
  {
    slug: 'bookmark-ribbon',
    name: 'BookmarkRibbon',
    japanese: '栞',
    group: 'ナビゲーション',
    motif: '物語の章',
    summary: '章番号を添えた縦書きの栞ボタン。時間帯の切り替えにも使えます。',
    detail: '本に挟んだ栞を想起させる、下端が切れ込んだシルエットが特徴です。クリックで任意の処理を渡せます。',
    usage: `import { BookmarkRibbon, useAkaneTheme } from '@tatsuyamiura2667/akane-lib';

const theme = useAkaneTheme();

<BookmarkRibbon chapter="三" title="第一夜" onClick={() => theme?.setPhase('night')} />`,
    props: [
      { name: 'title', type: 'string', default: '必須', description: '縦書きのタイトル' },
      { name: 'chapter', type: 'string', default: '—', description: '章番号・漢数字' },
      { name: 'onClick', type: '() => void', default: '—', description: 'クリック時の処理' },
      { name: 'className', type: 'string', default: "''", description: '追加クラス名' },
    ],
    related: ['akane-theme-provider', 'twilight-sky'],
  },
  {
    slug: 'lyric-lines',
    name: 'LyricLines',
    japanese: 'インク滲み歌詞',
    group: 'レイアウト',
    motif: '第一夜',
    summary: 'タイムスタンプに合わせて、インクが滲むように一行ずつ浮かび上がる詩節表示です。',
    detail:
      'currentTime を渡せば外部の再生時間に追従します。渡さない場合は autoPlay で内部タイマーが進み、loop で末尾から先頭へ戻ります。',
    usage: `import { LyricLines, type LyricLine } from '@tatsuyamiura2667/akane-lib';

const lines: LyricLine[] = [
  { time: 0, text: '一行目の詩' },
  { time: 4, text: '二行目の詩' },
];

<LyricLines lines={lines} currentTime={2} vertical />`,
    props: [
      { name: 'lines', type: 'LyricLine[]', default: '必須', description: '{ time, text } の配列' },
      { name: 'currentTime', type: 'number', default: '—', description: '同期する経過秒数' },
      { name: 'autoPlay', type: 'boolean', default: 'false', description: '内部タイマーで自動進行' },
      { name: 'loop', type: 'boolean', default: 'true', description: '末尾で先頭へ戻る' },
      { name: 'vertical', type: 'boolean', default: 'false', description: '縦書きにする' },
      { name: 'onLineSelect', type: '(time: number) => void', default: '—', description: '行選択時の処理' },
      { name: 'className', type: 'string', default: "''", description: '追加クラス名' },
    ],
    related: ['cassette-player', 'letter-card'],
  },
  {
    slug: 'white-lily-seal',
    name: 'WhiteLilySeal',
    japanese: '白百合の封蝋',
    group: 'ナビゲーション',
    motif: '第一夜',
    summary: '白百合の線画を封蝋に見立てた紋章ボタンです。',
    detail: '小さなアイコンとキャプションを添えられます。夜のテーマでは銀色の封蝋に切り替わります。',
    usage: `import { WhiteLilySeal } from '@tatsuyamiura2667/akane-lib';

<WhiteLilySeal caption="白い百合を一輪" onClick={() => setOpen(true)} />`,
    props: [
      { name: 'caption', type: 'string', default: '—', description: '添えるキャプション' },
      { name: 'onClick', type: '() => void', default: '—', description: 'クリック時の処理' },
      { name: 'className', type: 'string', default: "''", description: '追加クラス名' },
    ],
    notes: ['caption を省略すると aria-label に「白い百合の封蝋」が入ります。'],
    related: ['letter-card', 'lyric-lines'],
  },
  {
    slug: 'train-window-frame',
    name: 'TrainWindowFrame',
    japanese: '夜列車の車窓',
    group: 'レイアウト',
    motif: '夜の列車',
    summary: '流れる街灯りを備えた車窓フレーム。中身を旅の風景のように縁取ります。',
    detail: 'moving を false にすると街灯りのアニメーションを止められます。中のコンテンツはそのまま操作できます。',
    usage: `import { TrainWindowFrame } from '@tatsuyamiura2667/akane-lib';

<TrainWindowFrame>
  <p>窓の向こうの景色</p>
</TrainWindowFrame>`,
    props: [
      { name: 'children', type: 'ReactNode', default: '必須', description: '車窓の内側の要素' },
      { name: 'moving', type: 'boolean', default: 'true', description: '街灯りを流す' },
      { name: 'className', type: 'string', default: "''", description: '追加クラス名' },
    ],
    related: ['ghost-flower-refraction', 'letter-card'],
  },
  {
    slug: 'notebook-memo',
    name: 'NotebookMemo',
    japanese: '朝の手帳',
    group: '入力・演出',
    motif: '朝の手帳',
    summary: '罫線と赤いマージン、3色の万年筆インクを備えたメモ入力です。',
    detail:
      'value を渡すと制御モードになります。onSave を渡すと保存ボタンが現れ、テキスト・インク色・日付をまとめて受け取れます。',
    usage: `import { NotebookMemo } from '@tatsuyamiura2667/akane-lib';

<NotebookMemo
  date="朝の手帳"
  defaultInk="crimson"
  onSave={(entry) => console.log(entry)}
/>`,
    props: [
      { name: 'date', type: 'string', default: "'朝の手帳'", description: 'ヘッダーの見出し' },
      { name: 'placeholder', type: 'string', default: '窓の向こうに触れ…', description: '入力の案内文' },
      { name: 'value', type: 'string', default: '—', description: '制御モードの入力値' },
      { name: 'defaultValue', type: 'string', default: "''", description: '非制御時の初期値' },
      { name: 'defaultInk', type: 'FountainInk', default: "'blue-black'", description: "'blue-black' | 'crimson' | 'sepia'" },
      { name: 'submitLabel', type: 'string', default: "'書き留める'", description: '保存ボタンの文言' },
      { name: 'onChange', type: '(value: string) => void', default: '—', description: '入力変更の通知' },
      { name: 'onSave', type: '(entry) => void', default: '—', description: '保存時の通知' },
      { name: 'className', type: 'string', default: "''", description: '追加クラス名' },
    ],
    related: ['typewriter-censor-text', 'letter-card'],
  },
  {
    slug: 'sakura-thief-overlay',
    name: 'SakuraThiefOverlay',
    japanese: '桜吹雪の演出',
    group: '入力・演出',
    motif: '春泥棒',
    summary: 'コンテンツの上を花びらが舞うオーバーレイ。風の強さと枚数を個別に調整できます。',
    detail: 'active で花びらだけを消去でき、density は light / normal / gust の順に風の強さが増します。petalCount を指定すると density の枚数より優先され、0〜160 枚で細かく調整できます。oilPaint は花びらに筆致を加えます。',
    usage: `import { SakuraThiefOverlay } from '@tatsuyamiura2667/akane-lib';

<SakuraThiefOverlay density="gust" petalCount={48}>
  <p>春の風の中の一文</p>
</SakuraThiefOverlay>`,
    props: [
      { name: 'children', type: 'ReactNode', default: '—', description: '演出の内側に置く要素' },
      { name: 'active', type: 'boolean', default: 'true', description: '花びらを表示する' },
      { name: 'density', type: "'light' | 'normal' | 'gust'", default: "'normal'", description: '風の強さ（既定枚数 6 / 11 / 16）' },
      { name: 'petalCount', type: 'number', default: '—', description: '花びらの枚数。0〜160 に丸められます' },
      { name: 'oilPaint', type: 'boolean', default: 'false', description: '花びらに油絵の筆致を重ねる' },
      { name: 'className', type: 'string', default: "''", description: '追加クラス名' },
    ],
    notes: ['花びらの層は aria-hidden。prefers-reduced-motion では非表示になります。'],
    related: ['twilight-sky', 'oil-paint-texture'],
  },
  {
    slug: 'rain-ripple-button',
    name: 'RainRippleButton',
    japanese: '雨紋ボタン',
    group: 'ナビゲーション',
    motif: '雨とカプチーノ',
    summary: '押した地点から雨の波紋が広がるボタンです。',
    detail: 'onClick や disabled など、通常の button 属性をそのまま受け取れます。波紋はクリック座標から生成されます。',
    usage: `import { RainRippleButton } from '@tatsuyamiura2667/akane-lib';

<RainRippleButton onClick={() => console.log('雨紋')}>
  雨とカプチーノ
</RainRippleButton>`,
    props: [
      { name: 'children', type: 'ReactNode', default: '必須', description: 'ボタンのラベル' },
      { name: '...rest', type: 'ButtonHTMLAttributes', default: '—', description: 'onClick / disabled などの標準属性' },
    ],
    related: ['sakura-thief-overlay', 'akane-theme-provider'],
  },
  {
    slug: 'ghost-flower-refraction',
    name: 'GhostFlowerRefraction',
    japanese: '水面のゆらぎ',
    group: '入力・演出',
    motif: '花に亡霊',
    summary: 'SVG フィルタで光の屈折と残像を重ね、記憶の揺らぎを表現するラッパーです。',
    detail:
      'intensity が calm / ripple / mirage の順に歪みが強くなります。afterimage と caustics は個別に無効化できます。filter の ID は useId で作られるため、複数同時に使っても衝突しません。',
    usage: `import { GhostFlowerRefraction } from '@tatsuyamiura2667/akane-lib';

<GhostFlowerRefraction intensity="ripple" afterimage caustics>
  <p>水面に映った記憶</p>
</GhostFlowerRefraction>`,
    props: [
      { name: 'children', type: 'ReactNode', default: '必須', description: '屈折させる要素' },
      { name: 'intensity', type: 'RefractionIntensity', default: "'calm'", description: "'calm' | 'ripple' | 'mirage'" },
      { name: 'afterimage', type: 'boolean', default: 'true', description: '残像を重ねる' },
      { name: 'caustics', type: 'boolean', default: 'true', description: '水面の光跡を表示' },
      { name: 'className', type: 'string', default: "''", description: '追加クラス名' },
    ],
    notes: ['prefers-reduced-motion の環境ではアニメーションが止まり、静的な歪みだけが残ります。'],
    related: ['letter-card', 'train-window-frame'],
  },
  {
    slug: 'typewriter-censor-text',
    name: 'TypewriterCensorText',
    japanese: 'タイプライターと黒塗り',
    group: '入力・演出',
    motif: '思想犯',
    summary: '一文字ずつ打鍵し、[[ ... ]] で囲んだ語を黒塗りにできるテキストです。',
    detail:
      '打鍵速度は speedMs で調整します。黒塗りはクリック・Enter・Space で開示でき、aria-pressed と aria-label が状態を伝えます。instant を付けると打鍵を飛ばして即座に表示します。',
    usage: `import { TypewriterCensorText } from '@tatsuyamiura2667/akane-lib';

<TypewriterCensorText
  text={'隠された[[言葉]]を打ち込む'}
  speedMs={60}
  onComplete={() => console.log('打鍵終了')}
/>`,
    props: [
      { name: 'text', type: 'string', default: '必須', description: '表示する文字列。[[ ]] が黒塗りの指定' },
      { name: 'speedMs', type: 'number', default: '65', description: '1文字の打鍵間隔（ミリ秒）' },
      { name: 'revealOnHover', type: 'boolean', default: 'true', description: 'ホバーで開示可能にする' },
      { name: 'instant', type: 'boolean', default: 'false', description: '打鍵アニメーションを省略' },
      { name: 'onComplete', type: '() => void', default: '—', description: '打鍵完了時に呼ばれる' },
      { name: 'className', type: 'string', default: "''", description: '追加クラス名' },
    ],
    related: ['notebook-memo', 'letter-card'],
  },
  {
    slug: 'oil-paint-texture',
    name: 'OilPaintTexture',
    japanese: '油絵の質感',
    group: '入力・演出',
    motif: 'スケッチ／厚塗り',
    summary: '筆致・画布の目・厚塗りの光を CSS だけで重ねる、画像不要のテクスチャです。',
    detail:
      'variant で空・紙・花びらの色味を切り替え、intensity で濃さを揃えます。absolute で親いっぱいに広がり、pointer-events を持たないため、テキストやボタンの操作を邪魔しません。',
    usage: `import { OilPaintTexture } from '@tatsuyamiura2667/akane-lib';

<div style={{ position: 'relative' }}>
  <OilPaintTexture variant="paper" intensity="subtle" />
  <p>紙の上に置いた一行</p>
</div>`,
    props: [
      { name: 'variant', type: "'sky' | 'paper' | 'petal'", default: "'sky'", description: '質感の色味' },
      { name: 'intensity', type: "'subtle' | 'normal' | 'strong'", default: "'normal'", description: '重ねる濃さ' },
      { name: 'className', type: 'string', default: "''", description: '追加クラス名' },
    ],
    notes: ['画像や外部フォントを読み込みません。', '必ず position: relative の親要素の中に置いてください。'],
    related: ['twilight-sky', 'letter-card', 'sakura-thief-overlay'],
  },
  {
    slug: 'whisper-text',
    name: 'WhisperText',
    japanese: '届かない言葉',
    group: '入力・演出',
    motif: 'テレパス／昼鳶',
    summary: '一文字ずつ滲んで現れる、テレパシーと嫉妬の二つの側面を持つ文字演出です。',
    detail:
      'telepath は白い信号が途切れずに揺れる glitch、envy は赤く滲んだ黒塗りの残響です。歌詞をそのまま引用せず、情景だけを借りたオリジナルの文を渡してください。speedMs を小さくすると、早口の囁きになります。',
    usage: `import { WhisperText } from '@tatsuyamiura2667/akane-lib';

<WhisperText
  text={'言葉の代わりに、白い信号が降る'}
  variant="telepath"
  speedMs={48}
/>

<WhisperText
  text={'笑いながら夜景を数える、満たされない胸の音'}
  variant="envy"
  speedMs={62}
/>`,
    props: [
      { name: 'text', type: 'string', default: '必須', description: '表示する一文' },
      { name: 'variant', type: "'telepath' | 'envy'", default: "'telepath'", description: '雪海か嫉妬の演出' },
      { name: 'speedMs', type: 'number', default: '55', description: '1文字ずつの出現間隔（ミリ秒）' },
      { name: 'className', type: 'string', default: "''", description: '追加クラス名' },
    ],
    notes: [
      'prefers-reduced-motion が有効なら、すべての文字が一度に表示されます。',
      '読み上げ用の非表示テキストを内包しているため、スクリーンリーダーでも全文が読めます。',
    ],
    related: ['relic-scene', 'typewriter-censor-text', 'lyric-lines'],
  },
  {
    slug: 'relic-scene',
    name: 'RelicScene',
    japanese: '浮遊する遺物',
    group: '入力・演出',
    motif: 'テレパス／昼鳶／記憶',
    summary: '紙飛行機・信号輪・結晶・鳶・カセットを CSS 3D で浮かべる、画像不要の奥行きシーンです。',
    detail:
      'telepath は白い紙飛行機と記号の輪、envy は血色の結晶と鳶の影、memories はカセットテープが漂います。count で個数を 0〜40 まで調整でき、children を渡すと 3D レイヤーの手前に配置できます。',
    usage: `import { RelicScene, WhisperText } from '@tatsuyamiura2667/akane-lib';

<RelicScene variant="telepath" count={16}>
  <WhisperText text={'白く降る記号の中で、名前のない想いを送る'} />
</RelicScene>`,
    props: [
      { name: 'variant', type: "'telepath' | 'envy' | 'memories'", default: "'telepath'", description: '浮遊物と配色の種類' },
      { name: 'count', type: 'number', default: '14', description: '浮遊物の個数（0〜40）' },
      { name: 'children', type: 'ReactNode', default: '—', description: '手前に重ねる内容' },
      { name: 'className', type: 'string', default: "''", description: '追加クラス名' },
    ],
    notes: [
      'position / 高さは CSS 変数 --akane-relic-height で上書きできます。',
      '浮遊物は aria-hidden。prefers-reduced-motion では動きを停止します。',
    ],
    related: ['whisper-text', 'twilight-sky', 'cassette-player'],
  },
];

export interface MotifDoc {
  title: string;
  subtitle: string;
  body: string;
  components: string[];
  accent: string;
}

export const MOTIFS: MotifDoc[] = [
  {
    title: '夕凪',
    subtitle: '静かな雨の残照',
    body: '昼の熱が抜けきらない空に、細い雨が落ちる。背景の雨粒と、橙から藍へのグラデーションがこの時間の空気をつくります。',
    components: ['twilight-sky', 'bookmark-ribbon'],
    accent: '#c85a53',
  },
  {
    title: '茜さす',
    subtitle: '群青へ沈む寸前',
    body: '空の端がまだ赤い。光塵が漂う中で、紙とインクのコントラストが最も強まります。',
    components: ['twilight-sky', 'letter-card'],
    accent: '#b73b3a',
  },
  {
    title: '第一夜',
    subtitle: '白百合と夜行列車',
    body: '一輪の白い百合、開いた窓、インクが滲む詩。夜の配色は暗さではなく、月明かりの色として設計しています。',
    components: ['white-lily-seal', 'lyric-lines', 'train-window-frame'],
    accent: '#1e2d40',
  },
  {
    title: '思想犯',
    subtitle: '打鍵と検閲',
    body: '書いたはずの言葉が黒く塗り潰される。タイプライターのリズムと、開示された瞬間の戸惑いを操作に変えました。',
    components: ['typewriter-censor-text', 'notebook-memo'],
    accent: '#24211e',
  },
  {
    title: '花に亡霊',
    subtitle: '水面に残る像',
    body: '揺れる水面の上では、輪郭が少しだけ遅れて追いつく。SVG の歪みと残像で、記憶の揺らぎを表現します。',
    components: ['ghost-flower-refraction'],
    accent: '#3d5a80',
  },
  {
    title: '春泥棒',
    subtitle: '風に運ばれる花びら',
    body: '止めようにも止められない春の風。花びらの枚数と速度を変えることで、微風から春泥棒まで切り替えられます。',
    components: ['sakura-thief-overlay'],
    accent: '#e5989b',
  },
  {
    title: '雨とカプチーノ',
    subtitle: '指先に広がる波紋',
    body: '雨粒が水面で輪をつくるように、クリックした場所から波紋が広がるボタン。待つ時間にも手触りを与えます。',
    components: ['rain-ripple-button', 'twilight-sky'],
    accent: '#6d85a6',
  },
  {
    title: '靴とカセットテープ',
    subtitle: '巻き進む記憶',
    body: '再生ボタンを押すとリールが回り、時間が目に見えて進みます。音声がなくても、タイムラインとして使えるのが特徴です。',
    components: ['cassette-player', 'lyric-lines'],
    accent: '#9e2f2e',
  },
  {
    title: '朝の手帳',
    subtitle: '罫線と万年筆',
    body: '朝に書き留めた一行が、夜の便箋に運ばれていく。インク色を選べる手帳が、このライブラリの入口と出口です。',
    components: ['notebook-memo', 'letter-card'],
    accent: '#5c4332',
  },
  {
    title: '油絵のスケッチ',
    subtitle: '筆致と厚塗りの光',
    body: '線を描き足すのではなく、色を置き重ねて情景をつくる。画像を使わずに、画布の目と筆の跡を重ねる素材として追加しました。',
    components: ['oil-paint-texture', 'twilight-sky', 'letter-card'],
    accent: '#8c4a3c',
  },
  {
    title: 'テレパス',
    subtitle: '雪海と記号の残響',
    body: '言葉が形骸化し、白い雪とともに記号だけが降る荒廃した世界。伝えようとして伝わらない想いを、文字の滲みと浮遊する紙飛行機で表現しました。',
    components: ['whisper-text', 'relic-scene', 'oil-paint-texture'],
    accent: '#a6d0e6',
  },
  {
    title: '昼鳶',
    subtitle: '妬みとダイヤの夜景',
    body: '笑いながら住宅街を見下ろす、満たされない胸の音。血色の結晶と鳶の影を浮かべ、明るい昼に潜む闇を演出します。',
    components: ['whisper-text', 'relic-scene', 'typewriter-censor-text'],
    accent: '#7a1f27',
  },
];

export const FAQS: { question: string; answer: string }[] = [
  {
    question: 'スタイルが反映されません',
    answer:
      'ライブラリの CSS は自動で読み込まれません。アプリのエントリで @tatsuyamiura2667/akane-lib/style.css を一度だけ import してください。Vite なら src/main.tsx、Next.js の App Router なら app/layout.tsx などが適切です。',
  },
  {
    question: '思ったより明朝体になりません',
    answer:
      'Shippori Mincho は利用側で読み込む設計です。index.html の head に Google Fonts の link を追加してください。未読み込み時は Noto Serif JP、Yu Mincho、serif の順にフォールバックします。',
  },
  {
    question: '夜だけ文字が見づらいです',
    answer:
      'night / midnight フェーズでは紙色とインク色が反転します。色を固定したい場合はトークンを上書きするより、phase を twilight に固定するか、コンポーネントの className から配色を調整してください。',
  },
  {
    question: '時間帯を現在時刻に戻したい',
    answer:
      'useAkaneTheme() の resetToSystemTime() を呼ぶと、手動切り替えの状態が解除され、syncWithSystemTime の同期が再開します。',
  },
  {
    question: 'アニメーションを止めたい',
    answer:
      'OS の「視覚効果を減らす」設定（prefers-reduced-motion）に自動対応しています。コンポーネント単位では ambient / moving / active / afterimage などの props で演出をオフにできます。',
  },
  {
    question: 'Storybook が 404 になります',
    answer:
      '公開先は https://TatsuyaM2667.github.io/akane-lib/storybook/ です。末尾のスラッシュを外すと GitHub Pages がリダイレクトできない場合があります。',
  },
  {
    question: 'React 19 でも使えますか？',
    answer:
      'peerDependencies は React 18 と 19 の両方を許可しています。Storybook とテストは React 19 で実行しています。',
  },
  {
    question: '歌詞や音声ファイルは含まれていますか？',
    answer:
      '含まれていません。楽曲・物語の情景から着想を得たオリジナルの UI パーツとサンプル文です。CassettePlayer の audioSrc は利用側で用意した音声を指定してください。',
  },
  {
    question: '3D オブジェクトは WebGL を使いますか？',
    answer:
      '使いません。RelicScene は CSS の perspective と transform-style: preserve-3d だけで紙飛行機・結晶・鳶・カセットを浮かべているため、追加の依存や GPU 初期化は不要です。',
  },
];

export const TOKENS: { group: string; rows: { name: string; value: string; description: string }[] }[] = [
  {
    group: '色',
    rows: [
      { name: '--akane-crimson', value: '#b73b3a', description: '茜さす空のアクセント' },
      { name: '--akane-dusk', value: '#e07a5f', description: '夕焼けの残照' },
      { name: '--akane-ultramarine', value: '#1e2d40', description: '群青の夜空' },
      { name: '--akane-sea', value: '#3d5a80', description: '深い海と空' },
      { name: '--akane-paper', value: '#f7f4ee', description: '紙の地色（night では #162130）' },
      { name: '--akane-ink', value: '#24211e', description: '本文のインク（night では #e8ecf2）' },
    ],
  },
  {
    group: 'タイポグラフィ',
    rows: [
      { name: '--akane-font-serif', value: 'Shippori Mincho, …', description: '見出しと本文の基本書体' },
      { name: '--akane-tracking-poetic', value: '0.14em', description: '詩的な文字間' },
      { name: '--akane-leading-poetic', value: '2.1', description: '行間' },
    ],
  },
];
