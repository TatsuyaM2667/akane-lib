# ヨルシカ全MVをUI素材へ翻訳する

結論から言えば、追加すべきは個別MVのフレーム複製ではなく、**43作品のモチーフを抽象化した「12系統の横断モチーフ」「12個の提案カラートークン」「優先度付き30個のCSS/SVG/Reactプリミティブ」を、既存の8フェーズ型テーマと15コンポーネントへ接続する三層の拡張**である。2017〜2019年の厳密なMVは12本で、そこに公式アルバムトレーラー2本を加えた14行が初期期の母集団となり、2020〜2022年は映画連動PVを含む14タイトル、2023〜2026年は12タイトル、さらに横断資料から「八月、某、月明かり」「櫂」「二人称」を加えて合計43件になる（[公式BIOGRAPHY](https://yorushika.com/feature/biography), [公式ディスコグラフィ](https://yorushika.com/discography), [Universal『エルマ』](https://www.universal-music.co.jp/yorushika/news/2019-08-27/)）。重要なのは、これらを**曲名と1対1で結びつけず「紙／光／風／水／線／身体／視点」のような意味単位で部品化する**ことだ。制作側も『左右盲』で背景にもアウトラインを入れ、『晴る』で背景とキャラを「1つの空間デザイン」として扱っており、UI側も背景・文字・装飾を同じグレインと光源方向で包む必要がある（[CGWORLD 左右盲](https://cgworld.jp/article/202205-moriemv.html), [CGWORLD 晴る](https://cgworld.jp/article/2406-310-yorushika.html)）。提示するHEXはすべて設計用の近似値で、公式カラースクリプトでも実測値でもない（[CGWORLD 左右盲](https://cgworld.jp/article/202205-moriemv.html)）。歌詞・映像フレーム・キャラクターデザインは複製対象外とし、以下は手法・質感・配色傾向の抽象化にとどめる。

## 43作品を「種別」で分けると母集団が固定される

母集団の整理がまず必要である。調査ノートには「エルフの涙」（実際はAqua Timezの2014年アルバム）と「群青讃歌」（Eve／プロジェクトセカイ楽曲）という誤指定が混入しており、前者は『エルマ』／「エイミー」周辺、後者は「2021年以降」の時代目印として読み替えるのが妥当である（[Sony Music](https://www.sonymusic.co.jp/artist/AquaTimez/discography/ESCL-4267), [プロセカ](https://pjsekai.com/?babee1c459)）。2016年はn-buna個人の活動年でヨルシカMVは存在せず、「嘘月」は単独MVではなく映画『泣きたい私は猫をかぶる』の劇中映像PV（2020）とコラボPV（2021）として扱う（[公式2020](https://yorushika.com/news/detail/11141), [公式2021](https://yorushika.com/news/detail/11250)）。「八月、某、月明かり」は2019年アルバム収録曲だがMV公開は2025年で、多重露光風の表現が確認できる（[公式](https://yorushika.com/news/detail/11726), [OTOIRO](https://otoiro.co.jp/works/august-a-certain-moonlight)）。下表中、`MV`は厳密なミュージックビデオ、`trailer`は公式プロモーション映像、`連動PV`は映画／画集連動映像、`書籍`は物理的な媒体を示す。**合計43行の大部分はMVだが、明確に別種別なのはトレーラー2本・映画連動PV・画集連動・書簡型小説など数件**にとどまり、これらを種別ラベル付きで混載することが「全MV網羅」の誠実な形になる。

| # | 作品（年／種別） | 抽象モチーフ | 近似パレット（提案値） | 素材化の一手間 | 出典 |
|---:|---|---|---|---|---|
| 1 | 靴の花火（2017／MV） | 夕空、飛翔、花火、夏の街 | `#25324A` `#F2B880` `#EDE6D2` `#6E8C7A` | 放射`<line>`＋`radial-gradient()`残光 | [公式](https://yorushika.com/news/detail/11084), [Skream!](https://skream.jp/mv/2017/04/yorushika_fireworks-of-shoes.php) |
| 2 | 言って。（2017／MV） | 線画、実写混在、紙の余白 | `#F4F1E8` `#2C3038` `#B9C8C5` `#D98C7A` | 細罫線＋`multiply`トレース | [公式](https://yorushika.com/news/detail/10074), [音楽ナタリー](https://natalie.mu/music/news/238633) |
| 3 | 夏草が邪魔をする（2017／trailer） | 夏草、ノート、窓辺、生育する緑 | `#7C9A5C` `#D9E3C8` `#F3EFE2` `#3B4A36` | 二次ベジェ草＋`stroke-dasharray` | [YouTube](https://www.youtube.com/watch?v=6EgbGnSJnS4), [公式](https://yorushika.com/news/detail/10005) |
| 4 | 準透明少年（2018／MV） | 半透明、すりガラス、校庭、青白光 | `#DCE6EA` `#9FB7C2` `#4F5A63` `#F2EFE6` | `backdrop-filter: blur()`＋`mask-image` | [公式](https://yorushika.com/news/detail/10207), [SPICE](https://spice.eplus.jp/articles/177370) |
| 5 | ヒッチコック（2018／MV） | 学校、実写とアニメの継ぎ目 | `#F0D9B5` `#7A8CA1` `#3D4652` `#D98A7C` | グレイン＋斜め`clip-path`境界 | [公式](https://yorushika.com/news/detail/10239), [音楽ナタリー](https://natalie.mu/music/news/277610) |
| 6 | ただ君に晴れ（2018／MV） | 雨晴海岸、夏空、バス停、遠い月 | `#8FC5D8` `#EAF3F2` `#F3D9A4` `#3B5A6B` | 空グラデ＋水平な待合ライン | [公式](https://yorushika.com/news/detail/10294), [Wikipedia](https://ja.wikipedia.org/wiki/ただ君に晴れ) |
| 7 | 負け犬にアンコールはいらない（2018／trailer） | 犬、反復、紙ジャケット、赤アクセント | `#B4473C` `#E9DDC9` `#4E5A6B` `#2E3440` | `repeating-linear-gradient()`のリピート帯 | [YouTube](https://www.youtube.com/watch?v=Ckk9IJwDhNI), [音楽ナタリー](https://natalie.mu/music/news/277610) |
| 8 | 雲と幽霊（2018／MV） | 雲、旅、夏の終わり、淡い影 | `#DDE7EB` `#AFC4CC` `#6E8190` `#F1E7D7` | 透過雲レイヤーの視差＋`blur()` | [公式](https://yorushika.com/news/detail/10354), [JOYSOUND](https://news.joysound.com/article/295213) |
| 9 | 藍二乗（2018／MV） | 藍、部屋、手紙、木箱、深い残像 | `#1F3A5F` `#2E5C8A` `#E8DCC8` `#8B6F55` | 多重青＋`feDisplacementMap`のにじみ | [公式](https://yorushika.com/news/detail/10414), [ぴあ音楽](https://lp.p.pia.jp/article/news/68490/index.html) |
| 10 | パレード（2019／MV） | 行進、街、灰色の空、静かな熱量 | `#E6D9C6` `#5D6F7A` `#C38C6A` `#2C3A44` | 等間隔マーカーを`animation-delay`でずらす | [公式](https://yorushika.com/news/detail/11094), [YouTube](https://www.youtube.com/watch?v=ry3Tupx4BL4) |
| 11 | だから僕は音楽を辞めた（2019／MV） | 青空、部屋、机、手紙、日付 | `#2A4F76` `#C9D6DC` `#E7DDCB` `#4A3A32` | 机上面の階調＋`tabular-nums`日付 | [公式](https://yorushika.com/news/detail/10549), [音楽ナタリー](https://natalie.mu/music/news/326864) |
| 12 | 心に穴が空いた（2019／MV） | 人形、胸の穴、森、雨、修復痕 | `#C9C2B4` `#4E5A55` `#2C3A3A` `#D9C9A8` | 円形`mask`＋`repeating-radial-gradient()`縫い目 | [公式](https://yorushika.com/news/detail/10636), [Fanplus](https://music.fanplus.co.jp/pickUp/20190613673930473) |
| 13 | 雨とカプチーノ（2019／MV） | 雨、カフェ、泡、夢、白黒鍵盤 | `#D8D2C6` `#8B6F5E` `#F0E8D8` `#5C6B75` | 105度の雨線＋交互ストライプ | [公式](https://yorushika.com/news/detail/10700), [音楽ナタリー](https://natalie.mu/music/news/341966) |
| 14 | ノーチラス（2019／MV） | 全編3DCG、海底、潜水艦、花緑青 | `#123447` `#2E6E7E` `#8FB7AE` `#E4D9C3` | 深層グラデ＋気泡＋水中`feGaussianBlur` | [Universal](https://www.universal-music.co.jp/yorushika/news/2019-08-27/), [CGWORLD](https://cgworld.jp/article/-mvmorie-inc.html) |
| 15 | 夜行（2020／MV） | 手描き、夕暮れ→夜、記憶の街 | `#E9824B` `#1B2A4A` `#F2DCC0` `#0E1626` | 2停止グラデ＋遠景シルエット | [公式](https://yorushika.com/news/detail/11012), [navicon](https://navicon.jp/news/58470/) |
| 16 | 花に亡霊（2020／MV） | 夏空、入道雲、木漏れ日、残像 | `#8FC7E8` `#FDFBF2` `#7FA85B` `#F6C86A` | 重ねた`blur()`雲＋紙テクスチャ視差 | [『盗作』特設](https://sp.universal-music.co.jp/yorushika/tousaku/), [Enpedia](https://enpedia.org/wiki/%E3%83%A8%E3%83%AB%E3%82%B7%E3%82%AB) |
| 17 | 春ひさぎ（2020／MV） | ロトスコープ、面相の変容、赤と黒 | `#C73B2E` `#17151A` `#EFE7D8` `#D8B44A` | 粗い網点＋`skew()`残像 | [映像作家100人](https://eizo100.jp/video/68502), [rockin'on](https://rockinon.com/disc/detail/195091) |
| 18 | 思想犯（2020／MV） | 横長比率、断片、紙や硝子の欠落 | `#A8342A` `#6E6A66` `#1C1B1D` `#E8DED0` | 21:9超letterbox＋`polygon`裂け目 | [rockin'on](https://rockinon.com/news/detail/194533), [公式 Interview](https://sp.universal-music.co.jp/yorushika/tousaku/) |
| 19 | 盗作（2020／MV） | 引用、コラージュ、本、カセット、活字 | `#E7E2D6` `#22201E` `#8E3B32` `#8A6A4B` | 紙レイヤー`multiply`＋テープ矩形 | [特設](https://sp.universal-music.co.jp/yorushika/tousaku/), [Billboard](https://www.billboard-japan.com/special/detail/2960) |
| 20 | 風を食む（2020／MV） | 手描き線、風、紙の余白、春 | `#F4F1E8` `#2B2B29` `#A9BFA0` `#9FB4C4` | `stroke-dashoffset`で風を描く | [公式](https://yorushika.com/news/detail/11203), [EP特設](https://sp.universal-music.co.jp/yorushika/sousaku/) |
| 21 | 春泥棒（2021／MV） | 一人称、巨大な桜、花びら、木漏れ日 | `#F4B8C4` `#86A97B` `#FBF4E8` `#3A2A33` | 手持ち揺れ＋花びらパーティクル | [CGWORLD 対談](https://cgworld.jp/feature/202103-yorushika.html), [MORIE](https://morie-inc.com/works/yorushika_spring_thief/) |
| 22 | 嘘月（2020／連動PV, 2021／連動PV） | 月のハロー、窓、街灯、孤独 | `#16223A` `#F3ECDC` `#C89B57` `#6B7280` | `radial-gradient`＋窓枠グリッド＋ボケ光 | [公式2020](https://yorushika.com/news/detail/11141), [公式2021](https://yorushika.com/news/detail/11250) |
| 23 | 又三郎（2021／MV） | 風、水たまりの波紋、青嵐、夏草 | `#4E8C7A` `#A8D5E8` `#6E9BB5` `#C9B48B` | SVG風軌跡＋同心円`@keyframes` | [Real Sound](https://realsound.jp/2021/10/post-878196.html), [公式](https://yorushika.com/news/detail/11327) |
| 24 | 老人と海（2021／MV＋8本の関連映像） | 水平線、波音、古い椅子、麻、遠望 | `#3F6E8C` `#DCC7A0` `#E8B85C` `#F5F4EC` | 水平色帯＋波線ループ＋砂グレイン | [特設](https://sp.universal-music.co.jp/yorushika/oldman_sea/), [Real Sound](https://realsound.jp/2021/09/post-870755.html) |
| 25 | 月に吠える（2021／MV） | 深い夜、月、影を怪しむ犬、詩的空気 | `#E7E3D9` `#1A1A1E` `#D9D2E9` `#7E3D3A` | 不揃い墨線＋円月＋4色制限 | [特設](https://sp.universal-music.co.jp/yorushika/howling_at_the_moon/), [Universal](https://www.universal-music.co.jp/yorushika/news/2021-10-06/) |
| 26 | ブレーメン（2022／MV） | 足元、行進、雨音、寓話的連帯 | `#5C5E63` `#1D2022` `#C8C9C6` `#C9A05B` | 足跡マーカー＋縦雨オーバーレイ | [特設](https://sp.universal-music.co.jp/yorushika/bremen/), [Skream](https://skream.jp/news/2022/07/yorushika_bremen.php) |
| 27 | 左右盲（2022／MV） | 固定視点、新版画、カーテン、開いた本 | `#2E4057` `#C76B4E` `#EFE6D4` `#6F8064` | 一定幅アウトライン＋版木ノイズ | [CGWORLD](https://cgworld.jp/article/202205-moriemv.html), [Skream](https://skream.jp/news/2022/07/yorushika_sayumo_mv.php) |
| 28 | チノカテ（2022／MV） | 花瓶の花が散る、実写＋アニメ二層 | `#D9CCB8` `#D98C98` `#26262A` `#71879B` | 写真的グレイン＋手描き花弁SVG | [Skream](https://skream.jp/news/2022/09/yorushika_chinokate_mv.php), [公式](https://yorushika.com/news/detail/11418) |
| 29 | 451（2023／画集連動） | 画集、数字、閉じられた記録、セピア | `#20211F` `#5B5147` `#A84E3C` `#E9DFC8` | 巨大数字マスク＋背表紙グリッド | [YouTube](https://www.youtube.com/watch?v=RmYdZZLOYA8), [Universal](https://www.universal-music.co.jp/yorushika/news/2023-03-08) |
| 30 | テレパス（2023／MV） | 遠隔伝達、届かない、通信ノイズ | `#18263E` `#3F5E8A` `#82A9C4` `#E8EFF2` | 二重枠＋走査線＋軽いブラー | [公式](https://yorushika.com/news/detail/11464), [YouTube](https://youtu.be/LTeROfwwtnA) |
| 31 | 都落ち（2023／MV） | 万葉、夏の肖像、屏風、舞、前進 | `#17324D` `#3F6B55` `#B85C38` `#F3E6CC` | 水彩滲み＋縦パネル分割 | [Billboard](https://www.billboard-japan.com/d_news/detail/123713/2), [YouTube](https://youtu.be/pHdJmDFYqTU) |
| 32 | 晴る（2024／MV） | 雨から晴れ、親子、季節、紙切り背景 | `#2F6FA8` `#8FC2E2` `#DCE9E8` `#F5E9D0` | 空グラデ＋雲ブラー＋紙切り層 | [CGWORLD](https://cgworld.jp/article/2406-310-yorushika.html) |
| 33 | アポリア（2024／MV） | 図書館、気球、熱と冷気、上昇 | `#2B2A45` `#5B78A8` `#D9B36B` `#F0E6D2` | 本格子＋球体グラデ＋上昇レイヤー | [YouTube](https://www.youtube.com/watch?v=fhTFysCtF6g) |
| 34 | へび（2025／MV） | 目覚め、砂絵、ガラス絵、発光 | `#2F4A3C` `#8FA36B` `#D7B978` `#F0E6D2` | 砂`feTurbulence`＋重ね塗り発光 | [Skream](https://skream.jp/news/2025/02/yorushika_snake_mv.php), [共同](https://tvfan.kyodo.co.jp/music/news-music/1464551) |
| 35 | 火星人（2025／MV） | ロトスコープ、多言語タイポ、異星の身体 | `#6E2F38` `#B85C4A` `#6F8F83` `#211D2C` | 星屑ドット＋揺れた輪郭＋グリッド | [MORIE](https://morie-inc.com/works/martian), [pics.tokyo](https://www.pics.tokyo/works/yorushika_martian) |
| 36 | 修羅（2025／MV） | 内面の揺らぎ、筆致、断片、白黒反転 | `#15171B` `#4C5464` `#D64736` `#EFE9DC` | 炭粒＋荒いブラシ＋裂き紙遷移 | [pics.tokyo](https://www.pics.tokyo/works/yorushika_shura), [Real Sound](https://realsound.jp/2025/08/post-2120749.html) |
| 37 | 茜（2026／MV） | 同じ街、窓辺、視線の交差、茜夕暮れ | `#7D2E3B` `#24344F` `#B9856A` `#F2D8B8` | 二分画面＋温かいビネット | [Billboard](http://www.billboard-japan.com/d_news/detail/160090/2), [YouTube](https://youtu.be/VD_ztcqWBAY) |
| 38 | 千鳥（2026／MV） | 鹿の仮面、舞、舞台、再帰、同心円 | `#2A1F2E` `#B74736` `#E5C98F` `#6F7F67` | 仮面ポリゴン＋円錐スポット＋残像 | [MORIE](https://morie-inc.com/works/chidori), [pics.tokyo](https://www.pics.tokyo/works/yorushika_plover) |
| 39 | あぶく（2026／MV） | 論理ループ、密室、泡、脱出、新視点 | `#173B6B` `#3E7FB8` `#B7E4D8` `#F3F7F6` | 微ズレ無限タイル＋円形マスク泡 | [Billboard](https://www.billboard-japan.com/special/detail/5358), [ディスコグラフィ](https://yorushika.com/discography) |
| 40 | 雲を抜け風下へ私だけ（2026／MV） | 雲、風下、流線、中心の開口 | `#2C3E50` `#4A77A6` `#D7E3E8` `#E9B96E` | 視差雲＋`mask-image`開口部 | [Skream](https://en.skream.jp/news/2026/10/yorushika_kumowonuke_mv.php), [ディスコグラフィ](https://yorushika.com/discography) |
| 41 | 八月、某、月明かり（2025／MV） | 多重露光、夜、情景と感情の交差 | 提案：`#16223A` `#DCE6F0` `#C89B57` `#8A6A4F` | 2層`screen`＋`radial-gradient`マスク | [公式](https://yorushika.com/news/detail/11726), [OTOIRO](https://otoiro.co.jp/works/august-a-certain-moonlight) |
| 42 | 櫂（2026／二次情報のみ） | 水彩／インク／鉛筆、滲み、描き損じ | 提案：`#6E7FA8` `#D9A05B` `#8E3B32` `#F2EADB` | 滲みエッジ＋揺らぐ描線＋紙目 | [note／いるか（二次）](https://note.com/lush_bee2490/n/n3621316511f6) |
| 43 | 二人称（2026／書簡型小説） | 32通の往復書簡、封筒、手紙の物質性 | 提案：`#F7F0E1` `#24202E` `#8A6A4F` `#C8412F` | 封筒フラップ`clip-path`＋切手孔マスク | [ブレーン](https://www.sendenkaigi.com/creative/media/brain/2-cm2evdk/) |

## 12の横断モチーフが「処理」を再利用の単位に変える

カタログを俯瞰すると、作品固有の意匠ではなく**反復する「処理」こそがライブラリ化の単位**になる。色彩設計者の分析は、ヨルシカMVが強い色を使わず影の落とし方と光／影コントラストで夏を表現し、光源がはっきりしていることを指摘しており、『春泥棒』でも桜と木漏れ日の融合が制作側によって強調されている（[エキサイト／柴田亜紀子](https://www.excite.co.jp/news/article/E1616131351435/), [CGWORLD 春泥棒対談](https://cgworld.jp/feature/202103-yorushika.html)）。一方で『左右盲』は色数を削り、青をわずかに緑寄りにずらし、明るさを落としてビネットとグレインで空気感を出す（[CGWORLD 左右盲](https://cgworld.jp/article/202205-moriemv.html)）。つまり「季節の色」を固定するのではなく、**同じ面にノイズ・アウトライン・光源方向・フレームレートを共通適用し、ムードだけを差し替える**設計が制作現場のやり方に一致する。以下12系統は、43作品のモチーフ列を重ねて抽出したもので、各系統にCSS/SVGの操作レバーを対応させる。

| 系統 | 反復する内容 | 主な該当作品 | UIへの翻訳レバー | 裏付け |
|---|---|---|---|---|
| 紙・手紙・封筒・活字 | 手紙、日記、歌詞カード、本、封筒 | 言って。／藍二乗／だから僕は音楽を辞めた／盗作／451／二人称 | `--yk-paper`＋ファイバーグレイン＋等幅日付 | [公式](https://yorushika.com/news/detail/10450), [Billboard](https://www.billboard-japan.com/special/detail/2960), [ブレーン](https://www.sendenkaigi.com/creative/media/brain/2-cm2evdk/) |
| 青・夜・月・星屑 | blue hour、月明かり、群青、花緑青 | 靴の花火／ノーチラス／嘘月／月に吠える／八月、某、月明かり | `oklch()`の寒色＋`radial-gradient`ハロー | [OTOIRO](https://otoiro.co.jp/works/august-a-certain-moonlight), [CGWORLD](https://cgworld.jp/article/-mvmorie-inc.html) |
| 夏・空・入道雲・木漏れ日 | 強い光源、硬い影、光斑 | ただ君に晴れ／花に亡霊／春泥棒／晴る | 不揃い光斑`clip-path`＋`screen` | [エキサイト](https://www.excite.co.jp/news/article/E1616131351435/), [CGWORLD 晴る](https://cgworld.jp/article/2406-310-yorushika.html) |
| 雨・ガラス・水滴・波紋 | 105度の雨線、窓の雨粒、水面の輪 | 雨とカプチーノ／心に穴が空いた／左右盲／又三郎 | `repeating-linear-gradient()`＋局所`backdrop-filter` | [CGWORLD 左右盲](https://cgworld.jp/article/202205-moriemv.html), [音楽ナタリー](https://natalie.mu/music/news/341966) |
| 海・水平線・泡・溶け | 波線、航跡、気泡、溶ける焦点 | 老人と海／ノーチラス／あぶく／へび | 水平色帯＋波線ループ＋円形マスク | [Real Sound](https://realsound.jp/2021/09/post-870755.html), [CGWORLD](https://cgworld.jp/article/-mvmorie-inc.html) |
| 風・雲・カーテン・上昇 | 流線、視差雲、布の揺れ、気球 | 風を食む／又三郎／左右盲／アポリア／雲を抜け風下へ私だけ | 3次ベジェ＋`translateX()`視差 | [CGWORLD 左右盲](https://cgworld.jp/article/202205-moriemv.html), [Skream](https://en.skream.jp/news/2026/10/yorushika_kumowonuke_mv.php) |
| 花・花びら・散るもの | 桜、花瓶の花、花吹雪、散落 | 春泥棒／チノカテ／火星人 | 花弁パーティクルを1プリミティブに集約 | [CGWORLD 春泥棒](https://cgworld.jp/feature/202103-yorushika.html), [Skream](https://skream.jp/news/2022/09/yorushika_chinokate_mv.php) |
| 線・新版画・リソ・網点・滲み | 背景にも入る輪郭、ぼかし刷り、版ズレ | 左右盲／月に吠える／春ひさぎ／修羅 | 一定幅`stroke`＋`feDisplacementMap`＋網点 | [CGWORLD 左右盲](https://cgworld.jp/article/202205-moriemv.html), [OUWN](https://ouwn.jp/work/YORUSHIKA-MARTIAN/) |
| 身体・仮面・行進・舞 | ロトスコープ、足跡、モーショントレイル | 春ひさぎ／ブレーメン／千鳥／火星人／あぶく | 仮面的シルエット＋等間隔マーカー | [映像作家100人](https://eizo100.jp/video/68502), [MORIE 千鳥](https://morie-inc.com/works/chidori) |
| 断片・引用・多重露光・視点 | コラージュ、裂け目、一人称、固定、横長 | 思想犯／盗作／春泥棒／左右盲／八月、某、月明かり | `polygon`マスク＋aspect／viewpointトークン | [rockin'on](https://rockinon.com/news/detail/194533), [OTOIRO](https://otoiro.co.jp/works/august-a-certain-moonlight) |
| フィルム風ポストプロセス | グレイン、ビネット、レンズ歪み、12fps | 左右盲／千鳥／全体 | 240pxタイルのノイズ＋`isolation: isolate` | [CGWORLD 左右盲](https://cgworld.jp/article/202205-moriemv.html), [gradiently](https://gradiently.design/guide/css-noise-texture) |
| 文学・寓言の参照 | 宮沢賢治、グリム、萩原朔太郎、万葉 | 又三郎／ブレーメン／月に吠える／都落ち／修羅／千鳥 | 出典名の`SourceChip`（本文は引用しない） | [Real Sound](https://realsound.jp/2021/10/post-878196.html), [特設](https://sp.universal-music.co.jp/yorushika/bremen/) |

## 12個の提案トークンを既存8フェーズへ接続する

パレットは「作品ごとの固定」ではなく「場面の遷移」として設計すべきだ。『千鳥』の青→橙→紺や『櫂』の淡い紫／青→橙＋深紅→紺→クリームといった1本の中の温度変化は二次情報に依存するが、一次資料でも『晴る』の夕景で暖色と寒色の均衡、光と影の境界に鮮やかな色を置く方針が確認できる（[CGWORLD 晴る](https://cgworld.jp/article/2406-310-yorushika.html), [note／いるか（二次）](https://note.com/lush_bee2490/n/n3621316511f6)）。既存 `src/tokens.css` は `--akane-crimson` / `--akane-dusk` / `--akane-ultramarine` / `--akane-sea` と紙・インクを8フェーズで切り替える構成で、`AkaneThemeProvider` が `data-akane-phase` を付与している（[src/tokens.css](src/tokens.css), [src/context/AkaneThemeContext.tsx](src/context/AkaneThemeContext.tsx)）。したがって新トークンは既存名を上書きせず `--yk-*` の別系統として追加し、**既存フェーズへ「ムード」を重ねる**のが安全である。リソ風の実例ではダークモードで `multiply` を `screen` に切り替えるため、紙色・インク色をトークンでまとめて反転できる構造が望ましい（[freeframe](https://freeframe.dev/blog/designing-overprint-a-risograph-portfolio)）。

| 提案トークン | 提案HEX | 接続先（既存トークン／フェーズ） | 対応する質感・期 | 根拠 |
|---|---|---|---|---|
| `--yk-paper` | `#F7F0E1` | `--akane-paper`（`#f7f4ee`）に近い暖色紙 | 封筒・手紙・リソ下地 | [chrislemke](https://chrislemke.github.io/website_designs/designs/Risograph.html) |
| `--yk-ink` | `#24202E` | `--akane-ink`（`#24211e`） | charcoal線・活字 | [freeframe](https://freeframe.dev/blog/designing-overprint-a-risograph-portfolio) |
| `--yk-blue-hour` | `#2B4A92` | `--akane-sea` より彩度強め／`dusk`〜`twilight` | 初期の夜・blue hour | [freeframe](https://freeframe.dev/blog/designing-overprint-a-risograph-portfolio) |
| `--yk-blue-green` | `#3E6B69` | `--akane-sea` を緑寄りにシフト | 「青を緑寄りに」2022以降 | [CGWORLD 左右盲](https://cgworld.jp/article/202205-moriemv.html) |
| `--yk-summer-green` | `#6E8F6B` | `day` / `golden` のアクセント拡張 | 晴るの草原・夏草 | [CGWORLD 晴る](https://cgworld.jp/article/2406-310-yorushika.html) |
| `--yk-moon` | `#DCE6F0` | `night` / `midnight` の `--akane-ink` に近い | 月明かり・白 | [OTOIRO](https://otoiro.co.jp/works/august-a-certain-moonlight) |
| `--yk-dusk-orange` | `#D97A45` | `--akane-dusk`（`#e07a5f`）と同系統 | 夕景の暖色・夜行 | [CGWORLD 晴る](https://cgworld.jp/article/2406-310-yorushika.html), [navicon](https://navicon.jp/news/58470/) |
| `--yk-accent-red` | `#C8412F` | `--akane-crimson`（`#b73b3a`）の強め | 赤アクセント（小面積限定） | [CGWORLD MORIE](https://cgworld.jp/article/-mvmorie-inc.html) |
| `--yk-night-navy` | `#141C2E` | `--akane-ultramarine`（`#1e2d40`）の深い側 | 終盤の紺・夜空 | [Skream](https://skream.jp/news/2022/09/yorushika_chinokate_mv.php) |
| `--yk-sepia` | `#8A6A4F` | `--akane-ink-muted` の茶寄り | 古いラベル・451の archive | [Universal](https://www.universal-music.co.jp/yorushika/news/2023-03-08) |
| `--yk-mist` | `#B9C0C4` | `--akane-paper-border` の中間調 | 雨・ガラス・グレー階調 | [CGWORLD 左右盲](https://cgworld.jp/article/202205-moriemv.html) |
| `--yk-pencil` | `#6B6459` | `--akane-ink-muted`（`#6e675f`） | 鉛筆・手描き線 | [OUWN](https://ouwn.jp/work/YORUSHIKA-MARTIAN/) |

運用上の制約も同時にトークン化する。WCAG 1.4.3は通常テキスト4.5:1・大テキスト3:1で端数切り上げ不可、グラデーション上のテキストは最もコントラストの低い点で評価し、白文字をどんな背景にも通すスクリムは4.5:1で約54%が目安とされる（[WebAIM](https://webaim.org/articles/contrast/), [accessibility.build](https://accessibility.build/guides/text-over-images)）。`mix-blend-mode` は本文ではなく装飾レイヤーにだけ適用し、5秒超の自動カルーセルやムービー背景には停止操作を設ける（[osmanyy](https://osmanyy.com/projects/risograph-css/), [accessibility.build](https://accessibility.build/guides/text-over-images)）。モーションは静止をデフォルトにして `@media (prefers-reduced-motion: no-preference)` 内でのみ有効化し、8〜12fpsのグレインでも粗い設定では3fps以下に制限する（[Chrome](https://developer.chrome.com/docs/modern-web-guidance/guides/ui-behaviors/motion), [sunsided](https://sunsided.github.io/web-visual-fx/noise)）。アニメは `transform` と `opacity` のみに限定し、`feTurbulence` は `stitchTiles="stitch"` で小さなタイルを一度生成して繰り返す（[web.dev](https://web.dev/articles/animations-guide), [craft.gustavofior](https://craft.gustavofior.com/noise)）。

## 30のプリミティブはP0の9個から着手的に効く

実装順序は「全作品に共通する下地 → 代表作を覆うモチーフ → 物語的演出」の順が合理的である。既存リポジトリには `LetterCard` / `TwilightSky` / `CassettePlayer` / `NotebookMemo` / `RainRippleButton` / `SakuraThiefOverlay` / `TrainWindowFrame` / `OilPaintTexture` / `GhostFlowerRefraction` / `TypewriterCensorText` / `WhiteLilySeal` / `BookmarkRibbon` / `LyricLines` / `WhisperText` / `RelicScene` が揃っており（[src/index.ts](src/index.ts)）、新規追加より**既存の拡張で済むものを先に仕上げる**のが貢献度が高い。命名はPascalCase、CSSは隣接 `.css` という既存規約に合わせる（[src/components](src/components)）。P0の9個は43作品ほぼ全てに効く基盤で、P1の13個は上位モチーフを、P2の8個は個別作品の語彙を担う。

| 優先度 | プリミティブ（新規／拡張） | CSS / SVG の中核レシピ | React API の形 | 主な対応 |
|---|---|---|---|---|
| P0 | **FilmGrainOverlay**（新規） | `feTurbulence fractalNoise baseFrequency=.8 numOctaves=3 stitchTiles=stitch`＋`feColorMatrix saturate=0`を240px data URI化、`opacity:.08–.15` `soft-light` | `intensity`, `animated=false` | 全43作品の空気感・バンディング解消 ([gradiently](https://gradiently.design/guide/css-noise-texture)) |
| P0 | **PaperTexture / WashiPaper**（拡張：LetterCard, NotebookMemo） | 暖色ベース＋微小ノイズ＋`repeating-linear-gradient`繊維を`multiply` | `tone="paper"\|"washi"\|"newsprint"` | 紙・手紙・本 ([chrislemke](https://chrislemke.github.io/website_designs/designs/Risograph.html)) |
| P0 | **ShinhangaOutline**（新規） | `stroke:currentColor; stroke-width:1–1.25px`＋`feDisplacementMap scale=1–2`、`variant="background"`で背景にも適用 | `variant`, `wobble` | 左右盲／晴る／月に吠える ([CGWORLD](https://cgworld.jp/article/202205-moriemv.html)) |
| P0 | **BokashiGradient**（拡張：TwilightSky） | 2–3停止の`oklch()`重ね＋寒色を緑寄りに | `mood`, `stops` | 夜行／晴る／千鳥 ([CGWORLD](https://cgworld.jp/article/2406-310-yorushika.html)) |
| P0 | **HalftoneDots**（新規） | `radial-gradient(circle,currentColor 1px,transparent 1px)`/`background-size:6px`, 15/45/75degでモアレ回避 | `angle`, `density` | 春ひさぎ／リソ表現 ([freeframe](https://freeframe.dev/blog/designing-overprint-a-risograph-portfolio)) |
| P0 | **InkBleed**（新規） | `feGaussianBlur`→`feColorMatrix` alphaしきい値＋`feDisplacementMap`、文字ではなく枠・スタンプへ | `amount`, `seed` | 修羅／451／紙の滲み ([note（二次）](https://note.com/lush_bee2490/n/n3621316511f6)) |
| P0 | **VignetteLens**（新規） | `radial-gradient(ellipse,transparent 45%,rgba(0,0,0,.35))`を`multiply`、歪みは`scale(1.01)` | `strength` | 左右盲／茜 ([CGWORLD](https://cgworld.jp/article/202205-moriemv.html)) |
| P0 | **RisoMisregistration**（新規） | 見出し`::after`に`content:attr(data-ink)/""`で複製、別インク色＋`translate(.045em,.035em)`、40px以上限定 | `ink` | 火星人／タイポ演出 ([codefronts](https://codefronts.com/design-styles/css-grain-texture/risograph-print-misregistration-texture/)) |
| P0 | **MoodTokenSet**（拡張：tokens.css, AkaneThemeProvider） | `--yk-*` 12トークン＋`data-yk-mood`を8フェーズへ重ね、darkで`multiply`→`screen` | `mood`, `phase` | 全体の色遷移 ([freeframe](https://freeframe.dev/blog/designing-overprint-a-risograph-portfolio)) |
| P1 | **KomorebiLight**（新規） | 不揃い光斑を`clip-path:polygon()`＋`mask-image`、`mix-blend-mode:screen`、硬い影は別レイヤー | `spots`, `direction` | 春泥棒／花に亡霊／晴る ([エキサイト](https://www.excite.co.jp/news/article/E1616131351435/)) |
| P1 | **RainOnGlass / RainStreaks**（新規） | 105度細線＋水滴`radial-gradient`、背面に局所`backdrop-filter: blur(2px)` | `density`, `onGlass` | 雨とカプチーノ／左右盲／嘘月 ([CGWORLD](https://cgworld.jp/article/202205-moriemv.html)) |
| P1 | **WindPath**（新規） | 3次ベジェ`stroke-dasharray/offset`、親は`opacity`で消え入る | `seed`, `speed` | 風を食む／又三郎／雲を抜け… ([公式](https://yorushika.com/news/detail/11203)) |
| P1 | **PetalDrift**（拡張：SakuraThiefOverlay） | 花弁SVGを`transform`で落下、`prefers-reduced-motion`で静止 | `count`, `speed` | 春泥棒／チノカテ／火星人 ([CGWORLD](https://cgworld.jp/feature/202103-yorushika.html)) |
| P1 | **MoonHalo**（新規） | `radial-gradient`の円光＋ボケ光点、文字を入れず余白で寂寥 | `radius`, `glow` | 嘘月／月に吠える／八月、某、月明かり ([公式](https://yorushika.com/news/detail/11141)) |
| P1 | **FireworkBurst**（新規） | SVG放射`<line>`配列を`transform:scale()`で短く動かす | `rays`, `once` | 靴の花火／火星人 ([公式](https://yorushika.com/news/detail/11084)) |
| P1 | **UnderseaDepth**（新規） | 深い青緑の多層`radial-gradient`＋気泡＋`feGaussianBlur` | `depth`, `bubbles` | ノーチラス／あぶく ([CGWORLD](https://cgworld.jp/article/-mvmorie-inc.html)) |
| P1 | **EnvelopeSeal**（拡張：LetterCard, WhiteLilySeal） | フラップ`clip-path:polygon()`＋`inset box-shadow`＋切手孔`mask-image` | `stamp`, `open` | 二人称／盗作 ([ブレーン](https://www.sendenkaigi.com/creative/media/brain/2-cm2evdk/)) |
| P1 | **TapeLabel**（新規） | 両端を不揃いな`clip-path`、粘着筋、局所`rotate(-1.5deg)` | `angle`, `width` | 盗作のコラージュ世界観（物理媒体から推論） ([Billboard](https://www.billboard-japan.com/special/detail/2960)) |
| P1 | **NotebookPaper**（拡張：NotebookMemo） | 罫線＋左赤線を装飾レイヤー化、本文は`line-height`で制御 | `rule`, `marginLine` | 言って。／夏草／藍二乗 ([公式](https://yorushika.com/news/detail/10005)) |
| P1 | **TypographicStamp**（新規） | `border:2px double`＋`inset box-shadow`＋微小rotate＋`mask-image`インク欠け | `label`, `tone` | 451／火星人／タイポ ([OUWN](https://ouwn.jp/work/YORUSHIKA-MARTIAN/)) |
| P1 | **HandwrittenType**（新規） | 和文筆記体スタック＋固定seedの文字ごと`rotate/skew`、**DOM上は実テキスト** | `seed`, `textPath` | 火星人／都落ち ([OUWN](https://ouwn.jp/work/YORUSHIKA-MARTIAN/)) |
| P1 | **MultipleExposure**（新規） | 2層を`mix-blend-mode:screen`、片方に`mask-image:radial-gradient()`＋`translateX()` | `layers`, `offset` | 八月、某、月明かり ([OTOIRO](https://otoiro.co.jp/works/august-a-certain-moonlight)) |
| P2 | **HoleMask**（新規） | 中央円形`mask`＋`repeating-radial-gradient()`縫い目 | `size`, `stitch` | 心に穴が空いた ([公式](https://yorushika.com/news/detail/10636)) |
| P2 | **FractureMask**（新規） | SVG`polygon`の裂け目クリップ＋ノイズ | `pieces` | 思想犯／修羅 ([rockin'on](https://rockinon.com/news/detail/194533)) |
| P2 | **FacelessSilhouette**（新規） | 顔特徴を持たない`clip-path`シルエット、人物を模写しない | `variant` | 全体の「人物の不在」 ([ぴあ音楽](https://lp.p.pia.jp/article/news/68490/index.html)) |
| P2 | **AspectLetterbox**（新規） | 21:9 / 16:9 / 1:1 の切替トークン＋`viewpoint="pov"\|"fixed"` | `ratio`, `viewpoint` | 思想犯／春泥棒／左右盲 ([rockin'on](https://rockinon.com/news/detail/194533)) |
| P2 | **SourceChip**（新規・ドキュメント併用） | 出典名だけを小さなラベルで表示、本文は引用しない | `label`, `url` | 宮沢賢治／グリム／朔太郎 ([特設](https://sp.universal-music.co.jp/yorushika/howling_at_the_moon/)) |
| P2 | **BubbleField**（新規） | SVG円＋マスク、脱出時だけ彩度を上げる | `count`, `release` | あぶく／ノーチラス ([Billboard](https://www.billboard-japan.com/special/detail/5358)) |
| P2 | **LoopTile**（新規） | 同一タイルを微ズレで無限反復、`transform`のみ | `drift`, `tiles` | あぶく／パレード ([公式](https://yorushika.com/news/detail/11094)) |
| P2 | **WatercolorWash**（拡張：OilPaintTexture） | 滲み境界を`feGaussianBlur`＋しきい値、紙目を下地に重ねる | `bleed`, `pigment` | 櫂／都落ち／へび ([note（二次）](https://note.com/lush_bee2490/n/n3621316511f6), [YouTube](https://youtu.be/pHdJmDFYqTU)) |

最小レシピは次の2つで足りる。親に `isolation: isolate` を付け、装飾はすべて `pointer-events: none` と `aria-hidden="true"` にする（[craft.gustavofior](https://craft.gustavofior.com/noise), [chrislemke](https://chrislemke.github.io/website_designs/designs/Risograph.html)）。

```css
:root {
  --yk-noise: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='240' height='240'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
}
.yk-surface { position: relative; isolation: isolate; overflow: hidden; }
.yk-surface::after {
  content: ""; position: absolute; inset: 0; z-index: -1;
  background-image: var(--yk-noise); background-size: 240px 240px;
  opacity: .12; mix-blend-mode: soft-light; pointer-events: none;
}
.yk-halftone::after {
  content: ""; position: absolute; inset: 0; pointer-events: none;
  background-image: radial-gradient(circle, currentColor 1px, transparent 1px);
  background-size: 6px 6px; mix-blend-mode: multiply; opacity: .15;
}
```

## ドキュメントは「作品→モチーフ→部品」の三段で導線を設計する

ライブラリ側の追加だけでは利用者に届かないため、ドキュメント側も同じ抽象階層で更新する必要がある。現状 `src/docs/content.ts` の `MOTIFS` は「夕凪／茜さす／第一夜／思想犯／花に亡霊／春泥棒／雨とカプチーノ／靴とカセットテープ／朝の手帳／油絵のスケッチ／テレパス／昼鳶」の12項目で、いずれも既存コンポーネントへの参照だ（[src/docs/content.ts](src/docs/content.ts)）。ここへ今回の12系統を「辞典」として増やし、各項目に `components` と `accent`（提案トークン）を紐付ければ、利用者は曲名からではなく「纸／光／風」から部品へ辿れる。ホームの `COMPONENTS.length` による統計表示も新規コンポーネント数に追従し、Storybookの `12` はハードコードされているため更新漏れに注意が必要である（[src/docs/pages.tsx](src/docs/pages.tsx)）。

| 更新先 | 追加内容 | 理由 |
|---|---|---|
| `src/tokens.css` | `--yk-*` 12トークンと `data-yk-mood` 定義、dark時の `screen` 切替 | 既存 `--akane-*` を壊さずムードを重ねる ([src/tokens.css](src/tokens.css)) |
| `src/index.ts` | 新規コンポーネントと `Props` 型の export | パッケージ利用者へ公開 ([src/index.ts](src/index.ts)) |
| `src/docs/content.ts` | `COMPONENTS` に新規30件、`MOTIFS` に12系統、`TOKENS` に提案12色、`FAQS` にモーション／コントラスト注意 | 辞典・トークン表・QAを一箇所で管理 ([src/docs/content.ts](src/docs/content.ts)) |
| `src/docs/pages.tsx` | .stat のコンポーネント数／ストーリー数、ムード切替デモ、出典の扱い説明 | ハードコードされた「12」の更新 ([src/docs/pages.tsx](src/docs/pages.tsx)) |
| `src/stories/AkaneCatalog.stories.tsx` | P0→P1→P2順のストーリー、`reduced-motion` の状態見本 | 既存14コンポーネントの並びに合わせる ([src/stories/AkaneCatalog.stories.tsx](src/stories/AkaneCatalog.stories.tsx)) |
| `src/docs/docs.css` / `src/test/*.test.tsx` | 新規プレビュー用スタイルとARIA／静止状態の回帰テスト | 装飾レイヤーの `aria-hidden` を検証 ([src/test](src/test)) |

## 結論

43作品のカタログが示すのは、ヨルシカ的ビジュアルの正体が「特定の曲の絵」ではなく、**紙の目・一定幅の輪郭・光源方向・12fpsの揺らぎ・余白の置き方**という、CSS/SVGでそのまま記述できる処理の集合だということである。したがってライブラリの成果指標は「何曲を再現したか」ではなく「12系統のモチーフがすべて1つ以上のトークンとプリミティブに接続されたか」で測るべきだ。

残る不確実性も明示しておく。公式カラースクリプトは公開されておらず、2026年の『千鳥』『櫂』『あぶく』などの詳細は二次情報に依存する（[横断資料](https://note.com/lush_bee2490/n/n3621316511f6), [CGWORLD MORIE](https://cgworld.jp/article/-mvmorie-inc.html)）。しかしこの不確実性は実装を止めない。**HEXを「提案値」としてメタデータに刻み、`sourceTier: primary | press | secondary` と `generated` を分離すれば、あとで公式値が出たときにトークン差し替えだけで更新できる**構造になる。これが、著作物を複製せずに作品から学ぶための最も再利用性の高い形である。
