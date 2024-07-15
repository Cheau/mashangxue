import React from 'react'
import {
  GiChecklist,
  GiHearts,
  GiJellyBeans,
  GiKidneys,
  GiLiver,
  GiLungs,
  GiSoundOff,
} from 'react-icons/gi'

export const icons = {
  heart: <GiHearts />,
  spleen: <GiJellyBeans />,
  kidney: <GiKidneys />,
  lung: <GiLungs />,
  liver: <GiLiver />,
  off: <GiSoundOff />,
  all: <GiChecklist />,
}

export const playlists = {
  heart: ['紫竹调(古筝).mp3', '汉宫秋月(古筝).mp3', '苏武牧羊(埙).mp3'],
  spleen: ['秋湖月夜(笛子).mp3', '春江花月夜.mp3', '月儿高(古筝).mp3'],
  kidney: ['梅花三弄(古琴).mp3', '塞上曲(琵琶).mp3', '梁祝(古琴).mp3'],
  lung: ['潇湘水云(古琴).mp3', '阳春白雪(琵琶).mp3', '高山流水(古琴).mp3'],
  liver: ['江南丝竹.mp3', '庄周梦蝶(古琴).mp3', '胡笳十八拍.mp3'],
  off: [],
}

playlists.all = Object.values(playlists).flat()

export const theory = {
  heart: {
    effect: '舒心',
    element: '火',
    note: '徵',
    part: '入睡',
    intro: `心脏出问题，常出现失眠、心慌、心胸闷等情况，从而导致胸痛、烦躁等表征。
道医最讲究睡子午觉，所以一定要在子时之前就要让心气平和下来。
`
  },
  spleen: {
    effect: '健脾',
    element: '土',
    note: '宫',
    part: '用餐',
    intro: `长期的暴饮暴食、五味过重、思虑过度等都会让脾胃产生不适，腹胀、便稀、肥胖、口唇溃疡、面黄、月经量少色淡、疲乏、胃或子宫下垂都是常见的症状。
在进餐时，以及餐后一小时内欣赏，效果比较好。
`
  },
  kidney: {
    effect: '补肾',
    element: '水',
    max: 11,
    min: 7,
    note: '羽',
    intro: `肾乃先天之本，经常熬夜、过度劳累、喝酒喝浓茶都会伤肾。面色暗、尿频、腰酸、性欲低、黎明时分腹泻，都是肾不好的表现。
07：00~11：00是一天里气温持续走高的一个过程，人和大自然是相互影响的，在这个时间段，太阳在逐渐高升，体内的肾气也蠢蠢欲动地受着外界的感召，如果此时能够用属于金性质的商音和属于水性质的羽音搭配比较融洽的曲子可促使肾的精气隆盛。
`
  },
  lung: {
    effect: '润肺',
    element: '金',
    max: 19,
    min: 15,
    note: '商',
    intro: `吸烟、过度疲劳、呼吸道疾病、厨房油烟、汽车尾气、滥服药物、饮食不当都是引发肺部疾病、甚至是致癌的诱因。咽部溃疡疼痛、咳嗽、鼻塞、气喘、容易感冒、易出汗，都是肺不好的表现。
15：00~19：00太阳开始西下，归于西方金气最重的地方，体内的肺气在这个时段是比较旺盛的，随着曲子的旋律，一呼一吸之间，里应外合，事半功倍。
`
  },
  liver: {
    effect: '养肝',
    element: '木',
    max: 23,
    min: 19,
    note: '角',
    intro: `肝不好常常出现抑郁、易怒等情绪，而乳房胀痛、口苦、痛经、舌边部溃疡、眼部干涩、胆小、容易受惊吓则是外在表征。
19:00~23:00是一天中阴气最重的时间，一来可以克制旺盛的肝气，以免过多的肝气演变成火，另外可以利用这个时间旺盛的阴气来滋养肝，使之平衡正常。
`,
  },
  off: {
    effect: '休息',
  },
  all: {
    effect: '播放全部',
  }
}

const fixed = {
  icons,
  playlists,
  theory,
}

export default fixed
