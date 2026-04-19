export type Dimension = 'focus' | 'energy' | 'texture' | 'coping';

export interface Question {
  id: number;
  text: string;
  dimension: Dimension;
  reversed: boolean;
}

export const questions: Question[] = [
  // Focus
  { id: 1, text: "当城市突然停电，你的第一反应是凝视窗外成片死寂的钢铁丛林，思考它的现在、过去与未来，而不是急着给某个具体的人发一条未送达的短信。", dimension: "focus", reversed: false },
  { id: 2, text: "深夜下班一个人走在街上，抬头看星星时，你常常幻想自己是个被遗弃在地球的外星人，冷眼观察着这个荒谬的社会。", dimension: "focus", reversed: false },
  { id: 3, text: "如果必须被困在一个循环的梦境里，你宁愿梦见整个世界的荒芜，也不愿反复经历一次个人的心碎。", dimension: "focus", reversed: false },
  { id: 4, text: "你对成为拯救世界的英雄毫无兴趣，你最大的梦想只是买一栋带小花园的漂亮房子，过一种“没有惊喜，也没有警报声”的安稳生活。", dimension: "focus", reversed: true },
  { id: 5, text: "你觉得一滴眼泪落在皮肤上的重量，比屏幕里一千条滚动播放的灾难新闻更让你感到真实和沉重。", dimension: "focus", reversed: true },

  // Energy
  { id: 6, text: "当痛苦到达顶峰时，你心里总有个声音想要砸碎吉他、制造噪音，甚至想大喊一声“谁都可以弹吉他”然后把一切砸烂。", dimension: "energy", reversed: false },
  { id: 7, text: "世界明天就要毁灭，你也许会选择在街头狂奔呼喊。", dimension: "energy", reversed: false },
  { id: 8, text: "你习惯把所有尖锐的刺咽下去，让情绪在胃里慢慢结冰，表面上却依然保持着一种可怕的平静。", dimension: "energy", reversed: true },
  { id: 9, text: "当周围的一切变得糟糕透顶时，你最常用的方法是戴上耳机，在心里反复默念“我不在这里，这并没有发生”，让自己像幽灵一样在人群中消失。", dimension: "energy", reversed: true },
  { id: 10, text: "你心里乱作一团但又无法解决时，你会突然开始机械性地做家务（比如疯狂擦桌子、按颜色整理衣柜），把你所有的情绪都压缩且封印进这些极度枯燥、重复的微小动作里", dimension: "energy", reversed: true },

  // Texture
  { id: 11, text: "你觉得现代人与人之间的拉扯太粘腻了，你偶尔会幻想在赛博空间里做一串没有体温的代码。", dimension: "texture", reversed: false },
  { id: 12, text: "看着镜子里的自己，你有那么几个瞬间会觉得自己像是一个被掏空的仿生人，只是在费力地模拟人类的情感。", dimension: "texture", reversed: false },
  { id: 13, text: "当你深夜感到极度崩溃或孤独时，你发现自己宁愿对着 AI 倾诉，你觉得这种由代码计算出的“毫无杂质的安慰”，比去应付真实人类那种疲惫、充满主观评判的社交更让你觉得安心。", dimension: "texture", reversed: false },
  { id: 14, text: "冰冷的异化感是你对现代生活的最深感受", dimension: "texture", reversed: false },
  { id: 15, text: "你极度讨厌那种精密算计、严丝合缝的氛围。你更喜欢那种充满瑕疵的松弛感", dimension: "texture", reversed: true },

  // Coping
  { id: 16, text: "如果眼睁睁看着末班车从你面前开走，你不会气得直跺脚或者疯狂在群里抱怨命运不公，而是会觉得“那不如就慢慢走一段路吧”，甚至能在无人的深夜街道上感受到一种放空的自由。", dimension: "coping", reversed: true },
  { id: 17, text: "你心里的那个“偏执狂”一直在对这个荒诞的世界竖中指，哪怕徒劳无功，你也不愿放下手臂。", dimension: "coping", reversed: false },
  { id: 18, text: "当面对无法理解的规则和体制时，你的本能反应是怀疑和抵抗，而不是试图去适应和寻找其中的美感。", dimension: "coping", reversed: false },
  { id: 19, text: "面对无法挽留的失去，你更倾向于让记忆如湖水般没过头顶安静沉没。", dimension: "coping", reversed: true },
  { id: 20, text: "你相信万物终将衰败，与其与重力死磕，不如随波逐流地坠落，你觉得那种彻底失控的坠落感也是一种美。", dimension: "coping", reversed: true },
];

export interface Album {
  name: string;
  year: string;
  focus: number;
  energy: number;
  texture: number;
  coping: number;
  cover: string;
  desc: string;
  appleMusicId?: string;
  audioUrl?: string;
}

export const albums: Album[] = [
  { 
    name: "Pablo Honey", 
    year: "1993", 
    focus: 10, 
    energy: 90, 
    texture: 5, 
    coping: 95, 
    cover: "https://is1-ssl.mzstatic.com/image/thumb/Music114/v4/d9/b8/36/d9b83691-1546-96a2-756d-c5fff6a25ebf/192641516245_Cover.jpg/600x600bb.jpg", 
    desc: "滋滋……检测到极高浓度的原生情绪。\n你此刻的灵魂正处于一种极度真诚却又笨拙的阵痛期。你不关心什么宏大的时代命题，你只在乎自己为什么总是和周遭格格不入。你像一只竖起所有尖刺的刺猬，用最直白、最不加修饰的噪音来对抗自我厌恶。别觉得这种‘直白’很幼稚，在满是虚伪成年人的世界里，敢于大声喊出自己的脆弱，本身就是一种罕见的勇敢。",
    appleMusicId: "1519123975",
    audioUrl: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview126/v4/8d/e0/bb/8de0bb10-0593-83cc-4d2c-4e9f6ea9b575/mzaf_16440589638018943894.plus.aac.p.m4a"
  },
  { 
    name: "The Bends", 
    year: "1995", 
    focus: 30, 
    energy: 75, 
    texture: 15, 
    coping: 70, 
    cover: "https://is1-ssl.mzstatic.com/image/thumb/Music126/v4/1b/a9/5c/1ba95cac-b245-d386-63fb-6b857aa9dce8/634904078065.png/600x600bb.jpg", 
    desc: "滋滋……检测到浪漫与心碎的交织。\n你的灵魂刚刚从纯真的梦境中醒来，开始看清这个被塑料和消费主义包裹的成人世界。你对这种虚伪感到深深的恶心，但你依然对‘爱’和‘真实’抱有致命的执念。你是一边流泪一边清醒地看着一切崩塌的浪漫主义者。你的每一次心碎都极具美感，因为那证明了在这个麻木的社会里，你依然拥有血肉之躯的痛觉。",
    appleMusicId: "1097862703",
    audioUrl: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview126/v4/88/7c/92/887c92d6-0979-9f01-1e9b-6762fca517bd/mzaf_1998812167371306210.plus.aac.p.m4a"
  },
  { 
    name: "OK Computer", 
    year: "1997", 
    focus: 90, 
    energy: 60, 
    texture: 60, 
    coping: 90, 
    cover: "https://is1-ssl.mzstatic.com/image/thumb/Music116/v4/07/60/ba/0760ba0f-148c-b18f-d0ff-169ee96f3af5/634904078164.png/600x600bb.jpg", 
    desc: "滋滋……警告，系统过载。\n你的频率正与城市上空交错的电缆同频共振。你患上了一种名为‘现代性窒息’的症候群。当你看着川流不息的车辆、闪烁的屏幕和机械运转的社会，你感到的不是便捷，而是深深的异化与恐惧。你在这个钢筋水泥的迷宫里保持着痛苦的清醒，像一个拉响警报的先知。别太焦虑了，当你发现自己是个被异化的零件时，你其实就已经找回了人性。",
    appleMusicId: "1097861387",
    audioUrl: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview125/v4/95/d7/8b/95d78bf8-aa46-9d40-ce93-0652918bc68f/mzaf_12066288776609103708.plus.aac.p.m4a"
  },
  { 
    name: "Kid A", 
    year: "2000", 
    focus: 80, 
    energy: 5, 
    texture: 95, 
    coping: 15, 
    cover: "https://is1-ssl.mzstatic.com/image/thumb/Music122/v4/bd/8e/13/bd8e1358-b367-a689-cb84-cebd0b067dc4/634904078263.png/600x600bb.jpg", 
    desc: "滋滋……生命体征微弱，已进入真空状态。\n你的灵魂已经拔掉了与人类社会连接的插头。那些世俗的吵闹、人际的拉扯，对你来说都像是另一个星球的噪音。你选择将所有的情绪冷冻在绝对零度，化作一个没有重量的幽灵，冷眼旁观着这个荒诞的世界。你不再愤怒，也不再死磕，你找到了在废墟中失重漂浮的平静。这是一种极其高级的、冰冷的自我保护。",
    appleMusicId: "1097862870",
    audioUrl: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview125/v4/bd/05/e4/bd05e458-59dc-d46d-ea33-ea9c44523f57/mzaf_3986687910331329159.plus.aac.p.m4a"
  },
  { 
    name: "Amnesiac", 
    year: "2001", 
    focus: 70, 
    energy: 25, 
    texture: 80, 
    coping: 80, 
    cover: "https://is1-ssl.mzstatic.com/image/thumb/Music122/v4/43/d8/ec/43d8ec17-0e96-dba9-21d9-4cdf9d98f2bf/634904078362.png/600x600bb.jpg", 
    desc: "滋滋……陷入记忆回廊。\n你此刻的状态像是一本布满灰尘、记载着黑暗秘辛的旧书。你对周遭的世界充满了警惕和怀疑，甚至带有一丝神经质的幽闭恐惧。你不愿随波逐流，而是固执地在历史的碎片和个人的潜意识里寻找真相。别人觉得你难以理解，但只有你自己知道，在这种黏稠、压抑的暗流中死磕，是你在这个失忆世界里保持清醒的唯一方式。",
    appleMusicId: "1097864180",
    audioUrl: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview115/v4/2f/c4/93/2fc493e2-715f-cda6-4a9c-c8af6d734249/mzaf_2159298284715693075.plus.aac.p.m4a"
  },
  { 
    name: "Hail to the Thief", 
    year: "2003", 
    focus: 95, 
    energy: 85, 
    texture: 50, 
    coping: 95, 
    cover: "https://is1-ssl.mzstatic.com/image/thumb/Music/v4/4f/16/92/4f16923d-65a2-cc8c-1b49-8acb391f8a4d/0848129046826.jpg/600x600bb.jpg", 
    desc: "滋滋……检测到强烈的攻击信号。\n你的耐心已经耗尽，你心里的那团火正在熊熊燃烧。面对不公、强权或是生活中那些荒谬至极的规则，你的本能反应就是迎头痛击。你拒绝和解，拒绝被驯化，你就像一个站在大厦将倾的暴雨中、举着扩音器嘶吼的斗士。你此刻的灵魂充满了焦躁不安的粗糙生命力，哪怕知道自己势单力薄，你也要做那个大声说‘不’的人。",
    appleMusicId: "595152839",
    audioUrl: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview115/v4/2a/bf/55/2abf5507-0957-fcfa-498a-5eaa5c6216b9/mzaf_3332475156282036842.plus.aac.p.m4a"
  },
  { 
    name: "In Rainbows", 
    year: "2007", 
    focus: 15, 
    energy: 45, 
    texture: 10, 
    coping: 10, 
    cover: "https://is1-ssl.mzstatic.com/image/thumb/Music126/v4/dd/50/c7/dd50c790-99ac-d3d0-5ab8-e3891fb8fd52/634904032463.png/600x600bb.jpg", 
    desc: "滋滋……频率趋于温暖，心跳恢复平稳。\n你刚刚放下了那些沉重宏大的执念，回到了人类情感最深处的地方。你依然知道世界的糟糕，也深知人性的脆弱和宿命的不可抗拒，但你选择了用极大的包容去接受这一切。你不再试图改变潮水的方向，而是学会了在潮水中优雅地游弋。你现在的状态极其性感、从容且充满呼吸感，你终于懂得，即使在末日里，爱与肉温依然是唯一的解药。",
    appleMusicId: "1109714933",
    audioUrl: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview116/v4/2e/48/d8/2e48d83b-0dd4-5336-ba90-a08a14771bc3/mzaf_6995897912540104374.plus.aac.p.m4a"
  },
  { 
    name: "The King of Limbs", 
    year: "2011", 
    focus: 60, 
    energy: 20, 
    texture: 85, 
    coping: 5, 
    cover: "https://is1-ssl.mzstatic.com/image/thumb/Music126/v4/af/b6/7b/afb67b4e-6cf8-10b3-31f1-1389e301166d/634904078768.png/600x600bb.jpg", 
    desc: "滋滋……人类信号减弱，自然律动增强。\n你的灵魂已经脱离了都市的引力场，步入了一片由错综复杂的电子节拍构成的神秘森林。你不再关心人与人之间的爱恨情仇，你的视角退到了极其宏大的自然循环中。万物生长与衰败，在你看来不过是不同节奏的 Loop（循环）。你像一个沉浸在冥想中的萨满祭司，在无序的混沌中，找到了属于你自己的神秘呼吸法。",
    appleMusicId: "1109714965",
    audioUrl: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview125/v4/5c/a0/14/5ca014cd-a673-f065-edce-55be237799ce/mzaf_11960758223100583127.plus.aac.p.m4a"
  },
  { 
    name: "A Moon Shaped Pool", 
    year: "2016", 
    focus: 10, 
    energy: 10, 
    texture: 25, 
    coping: 20, 
    cover: "https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/b7/f2/5d/b7f25d91-4320-47c8-146a-6f84d5bc7e78/cover.jpg/600x600bb.jpg", 
    desc: "滋滋……系统正在静默，湖水漫过头顶。\n所有的刺都被岁月磨平了。你此刻的心里装满了一种极其巨大、却又极其安静的失去。也许是一段感情的剥离，也许是对某个时代的告别。你没有歇斯底里，而是选择在空灵的管弦乐中，优雅地凝视着一切慢慢沉没。你接纳了这种无法挽回的悲伤，将它升华成了一种哀而不伤的极致美感。你是一首极度轻盈，却又重如泰山的诗。",
    appleMusicId: "1111577743",
    audioUrl: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview125/v4/33/dd/9a/33dd9a98-2501-cd01-bd69-58bb21737743/mzaf_14297871625753893271.plus.aac.p.m4a"
  }
];

export const tenthAlbum = { 
  name: "第十张专辑", 
  year: "未知", 
  focus: 50,
  energy: 50,
  texture: 50,
  coping: 50,
  cover: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Radiohead.Bear.svg/512px-Radiohead.Bear.svg.png", 
  desc: "滋滋……频率未收录。\n你的灵魂坐标巧妙地避开了 Radiohead 所有的现成切片。这并不是因为你是一座孤岛，而是因为你的波段，恰好落在了他们尚未涉足的空白声场里。\n相比于他们已经嘶吼过的末世危机，或者已经咀嚼透彻的私密心碎，你对那些他们尚未表达出的复杂情感、还未观测到的异化未来有着更深烈的共鸣。你不需要在旧磁带里对号入座，因为也许你真正契合的，是他们还在脑海中构思、甚至永远不会发行的‘第十张专辑’。",
  appleMusicId: "1444789926" // Dummy ID pointing to a Radiohead artist generic compilation or OK Computer to avoid iframe crash
};
